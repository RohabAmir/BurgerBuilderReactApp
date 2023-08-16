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
import * as burgerBuilderActions from '../../store/actions/index';


class burgerBuilder extends Component{

    state = { //defining and manipulating th state in the main container 
        purchasing: false,
    }

    componentDidMount() { //Fetching data from Backend
        console.log(this.props);
        this.props.onInitIngredients();
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
        
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }


    render(){

        const disabledInfo={         
            ...this.props.ings
        };
        for(let key in disabledInfo){ //{ salad: true, meat:false}
            disabledInfo[key]= disabledInfo[key] <=0
        }

        let orderSummary=null;
        let burger=  this.props.error ? <p><strong>Ingredients can't be loaded</strong></p> : <Spinner/>;

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
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return{

        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseInit : () => dispatch(burgerBuilderActions.purchaseInit())
    };

};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(burgerBuilder, axios));