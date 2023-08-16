import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess =(id, orderData)=>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderid: id,
        orderData: orderData

    };
};

export const purchaseBurgerFail =(error)=>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error

    };
};

export const purchaseBurgerStart = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger =(orderData)=>{ // handling orders Aynchronously
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData) //Sending data to Backend
        .then(response=>{
            dispatch( purchaseBurgerSuccess(response.data.name , orderData ))

        })
        .catch(error=>{
            dispatch( purchaseBurgerFail(error));

        });

    };

};

export const purchaseInit=() =>{
    return{
        type: actionTypes.PURCHASE_INIT

    };
};

