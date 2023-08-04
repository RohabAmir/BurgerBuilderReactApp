import React,{ Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";


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
        purchasable: false
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients) //getting the array of properties of ingredients
            .map(igKey =>{
                return ingredients[igKey]; //getting the values of each property of ingfredient
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
    
    render(){

        const disabledInfo={         
            ...this.state.ingredients
        };
        for(let key in disabledInfo){ 
            disabledInfo[key]= disabledInfo[key] <=0
        }
        //{ state: true, meat:false}

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}  /> {/*Previewing and adding ingredients in the Burger Component */}
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} />
                    
            </Aux>

        );
    }
}

export default burgerBuilder;