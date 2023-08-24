import React  from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux";
import UseHttpErrorHandler from '../../hooks/http-error-handler';

const WithErrorHandler=( WrappedComponent, axios ) =>{
    return props => {
        const[error, clearError] = UseHttpErrorHandler(axios);
        
            return(
                <Aux>
                    <Modal 
                        show={error}
                        modalClosed={clearError}>
                       {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Aux>

            );
        }
}

export default WithErrorHandler;