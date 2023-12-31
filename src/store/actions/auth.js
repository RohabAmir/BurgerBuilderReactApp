import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};
export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };  
};
export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');

    return{
        type: actionTypes.AUTH_LOGOUT
    };
};
export const checkAuthTimeout=(expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime * 1000)
    };
};

export const auth= (email,password, isSignUp)=>{ //handling Authentication Asynchronosuly 
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDfY09kJpU87eHRMGqiKew4YrxBXP7KJf4';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDfY09kJpU87eHRMGqiKew4YrxBXP7KJf4';
        }
        axios.post(url,authData)
            .then(response =>{
                if (response.data && response.data.expiresIn) {
                    const expirationDate = new Date(
                      new Date().getTime() + response.data.expiresIn * 1000
                    );
                    localStorage.setItem('expirationDate', expirationDate);
                }
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);


                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    }
};

export const setAuthRedirectPath= (path)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch (logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date ()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('localId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000));
            }
        }
    }
}


