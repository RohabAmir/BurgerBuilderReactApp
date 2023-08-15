import React,{ Component } from "react";
import { connect } from 'react-redux';
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';


class burgerBuilder extends Component{

    state = { //defining and manipulating th state in the main container 
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() { //Fetching data from Backend
        // console.log(this.props);
        // axios.get('https://react-my-burger-4674d-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })

    }


    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients) //getting the array of properties of ingredients
            .map(igKey =>{
                return ingredients[igKey]; //getting the values of each property of ingredient
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0);
        return  sum > 0 ; //manipulating the state 
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () =>{
        const queryParams=[]; //Passing Ingredients via Query Params
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:"/checkout",
            search:'?' + queryString

        });
    }


    render(){

        const disabledInfo={         
            ...this.props.ings
        };
        for(let key in disabledInfo){ //{ salad: true, meat:false}
            disabledInfo[key]= disabledInfo[key] <=0
        }

        let orderSummary=null;
        let burger=  this.state.error ? <p><strong>Ingredients can't be loaded</strong></p> : <Spinner/>;

        if(this.props.ings){
            burger=(
            <Aux>
                <Burger ingredients={this.props.ings}  /> {/*Previewing and adding ingredients in the Burger Component */}
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price} />
            </Aux>
            );
            orderSummary= <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }

        if(this.state.loading){
            orderSummary=<Spinner/>
        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                    
            </Aux>

        );
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return{

        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })

    }

};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(burgerBuilder, axios));