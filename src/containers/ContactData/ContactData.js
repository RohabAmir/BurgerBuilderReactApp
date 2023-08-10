import React, { Component } from "react";

class contactData extends Component{
    state={
        name: "",
        email: '',
        address:{
            street: '',
            postalCode: ''
        }

    }


    render(){
        return(
            <div>
                <h1>Enter Your Contact Data</h1>
                <form>
                    <input type="text" name='name' placeholder="Your name"/>
                    <input type="email" name='email' placeholder="Your email"/>
                    <input type="text" name='street' placeholder="Street"/>
                    <input type="text" name='postal' placeholder="Postal Code"/>

                </form>
            </div>
        




        );
    }
}
export default contactData;