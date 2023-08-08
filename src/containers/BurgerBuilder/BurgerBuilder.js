import React,{ Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";


const INGREDIENTS_PRICES={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


class burgerBuilder extends Component{

    state = { //defining and manipulating th state in the main container 
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients) //getting the array of properties of ingredients
            .map(igKey =>{
                return ingredients[igKey]; //getting the values of each property of ingredient
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0);
        this.setState({purchasable : sum > 0}); //manipulating the state 
    }

    addIngredientHandler = (type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice + priceAddition;
        this.setState({totalPrice:newPrice , ingredients:updatedIngredients}) //manipulating the state 
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice , ingredients:updatedIngredients}) //manipulating the state 
        this.updatePurchaseState(updatedIngredients);

    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () =>{
        //alert("You Contiue!")
        this.setState({loading: true});
        const order={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Rohab Aamir',
                address: {
                    street: 'Street-B',
                    zipCode: '6303',
                    country: 'Pakistan'
                },
                email: 'Rohabamir2@gmail.com',
                phoneNo: '0320-******'   
            },
            deliveryMethod: "fastest"
        }

        axios.post('/orders.json', order)
            .then(response=>{
                this.setState({loading: false, purchasing: false})
            })
            .catch(error=>{
                this.setState({loading: false, purchasing: false})
            });
    }


    render(){

        const disabledInfo={         
            ...this.state.ingredients
        };
        for(let key in disabledInfo){ //{ salad: true, meat:false}
            disabledInfo[key]= disabledInfo[key] <=0
        }

        let orderSummary= <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>
        if(this.state.loading){
            orderSummary=<Spinner/>
        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}  /> {/*Previewing and adding ingredients in the Burger Component */}
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
                    
            </Aux>

        );
    }
}

export default burgerBuilder;