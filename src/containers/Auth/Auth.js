import React, { Component} from "react";
import classes from './Auth.module.css';
import Input from "../../components/UI/Forms/Input";
import Button from "../../components/UI/Button/Button";

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
                    required: true
                },
                valid: false,
                touched: false 
            } ,      
        }
    }
    checkValidity(value,rules){
        let isValid= true;

        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    render(){
        const formElementsArray=[]; // coverting JS object into array to map the elements
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event,formElement.id)}  
            />
        )   );


        return(
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
            </div>
        );
    }
}
export default Auth;