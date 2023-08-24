import React  from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import ContactData from "../ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = props =>{


    const checkoutCancelled=()=>{
        props.history.goBack();
    }

    const checkoutContinued=()=>{
        props.history.replace('/checkout/contact-data');
    }

        let summary = <Redirect to="/" />
        if(props.ings){
            const purchaseReditrect = props.purchased ?  <Redirect to="/" /> : null ;
            summary=(
                <div>
                    {purchaseReditrect}
                    <CheckoutSummary 
                        ingredients={props.ings}
                        checkoutCancelled={checkoutCancelled}
                        checkoutContinued={checkoutContinued}/>
                    <Route
                        path={props.match.path + '/contact-data'} 
                        component={ContactData}/>
                </div>
            );
        }
        return summary;
    }


const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);