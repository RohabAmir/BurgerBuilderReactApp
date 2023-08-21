import React, { Component} from "react";
import { updateObject, checkValidity} from "../../shared/utility";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from './Auth.module.css';
import Input from "../../components/UI/Forms/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as Actions from '../../store/actions/index';

class Auth extends Component{
    state={
        controls:{
            email:{
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value:'',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false 
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false 
            } ,      
        },
        isSignUp: true
    }
    componentDidMount(){

        if(!this.props.BurgerBuilding){ //Redirecting to home page
            this.props.onSetAuthRedirectPath();
        }
    }


    inputChangeHandler = (event,controlName) => {
        const updatedControls= updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});

    }
    submitHandler=(event)=>{
        event.preventDefault(); //to prevent from the reloading of page
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    switchAuthModeHandler=()=>{

        this.setState(prevState =>{
            return{isSignUp: !prevState.isSignUp}
            
        })
    }

    render(){
        const formElementsArray=[]; // coverting JS object into array to map the elements
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event,formElement.id)} />
        )   );

        if(this.props.loading){
            form= <Spinner/>
        }

        let errorMessage= null;
        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect= <Redirect to={this.props.authRedirectPath} /> //dynamically state the Redirect 
        }


        return(
            <div className={classes.Auth}>
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHandler}>

                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>SWITCH TO { this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}
const mapStateToProps=state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        BurgerBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath

    };
};
const mapDispatchToProps = dispatch =>{
    return{

        onAuth: (email,password, isSignUp) => dispatch(Actions.auth(email,password, isSignUp)),
        onSetAuthRedirectPath : ()=> dispatch(Actions.setAuthRedirectPath('/'))

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);