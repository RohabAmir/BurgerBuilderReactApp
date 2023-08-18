import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (authData) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};
export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth= (email,password, isSignUp)=>{ //handling Authentication Asynchronosuly 
    return dispath=>{
        dispath(authStart());
        const authData={
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDfY09kJpU87eHRMGqiKew4YrxBXP7KJf4'
        if(!isSignUp){
            url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDfY09kJpU87eHRMGqiKew4YrxBXP7KJf4'
        axios.post(url,authData)
            .then(response =>{
                console.log(response);
                dispath(authSuccess(response.data));
            })
            .catch(err => {
                dispath(authFail(err));
            });
    }
}
}

