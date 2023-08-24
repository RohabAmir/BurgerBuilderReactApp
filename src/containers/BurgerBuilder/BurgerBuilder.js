import React, {useState, useEffect}  from "react";
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


const BurgerBuilder = props =>{

    const[purchasing, setPurchasing] = useState(false);
    const{ onInitIngredients } = props;

    useEffect(()=>{ //Fetching data from Backend
        onInitIngredients();

    },[onInitIngredients]) 


    const updatePurchaseState= (ingredients) => {

        const sum = Object.keys(ingredients) //getting the array of properties of ingredients
            .map(igKey =>{
                return ingredients[igKey]; //getting the values of each property of ingredient
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0);
        return  sum > 0 ; //manipulating the state 
    }
    
    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true);
        }else{
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () =>{
        
        props.onPurchaseInit();
        props.history.push('/checkout');
    }

        const disabledInfo={         
            ...props.ings
        };
        for(let key in disabledInfo){ //{ salad: true, meat:false}
            disabledInfo[key]= disabledInfo[key] <=0
        }

        let orderSummary=null;
        let burger=  props.error ? <p><strong>Ingredients can't be loaded</strong></p> : <Spinner/>;

        if(props.ings){
            burger=(
            <Aux>
                <Burger ingredients={props.ings}  /> {/*Previewing and adding ingredients in the Burger Component */}
                <BuildControls 
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    price={props.price} />
            </Aux>
            );
            orderSummary= <OrderSummary 
                ingredients={props.ings}
                price={props.price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}/>
        }

        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                    
            </Aux>

        );
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    };
};

const mapDispatchToProps = dispatch => {
    return{

        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseInit : () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath : (path)=> dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    };

};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));