import React, { Component } from "react";

import classes from './ContactData.module.css';
import Button from "../../components/UI/Button/Button";

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
            <div className={classes.ContactData}>
                <h1>Enter Your Contact Data</h1>
                <form>
                    <input className={classes.Input} type="text" name='name' placeholder="Your name"/>
                    <input className={classes.Input} type="email" name='email' placeholder="Your email"/>
                    <input className={classes.Input} type="text" name='street' placeholder="Street"/>
                    <input className={classes.Input} type="text" name='postal' placeholder="Postal Code"/>

                </form>
                <Button btnType='Success'>ORDER</Button>
            </div>
        




        );
    }
}
export default contactData;