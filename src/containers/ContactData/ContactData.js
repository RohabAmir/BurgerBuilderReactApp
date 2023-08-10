import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from './ContactData.module.css';
import Button from "../../components/UI/Button/Button";
import axios from '../../axios-orders';

class contactData extends Component{
    state={
        name: "",
        email: '',
        address:{
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler=(event)=>{
        event.preventDefault(); // this gonna prevent the default which would be to send a request
        this.setState({loading: true});
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Rohab Aamir',
                address: {
                    street: 'Street-B',
                    zipCode: '6303',
                    country: 'Pakistan'
                },
                email: 'Rohabamir2@gmail.com',
                phoneNo: '0320-******'   
            },
            deliveryMethod: "fastest"
        }

        axios.post('/orders.json', order) //Sending data to Backend
            .then(response=>{
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(error=>{
                this.setState({loading: false})
            });

    }


    render(){
        let form=(
            <form>
                    <input className={classes.Input} type="text" name='name' placeholder="Your name"/>
                    <input className={classes.Input} type="email" name='email' placeholder="Your email"/>
                    <input className={classes.Input} type="text" name='street' placeholder="Street"/>
                    <input className={classes.Input} type="text" name='postal' placeholder="Postal Code"/>

                </form>
        );

        if(this.state.loading){
            form= <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h1>Enter Your Contact Data</h1>
                {form}
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </div>
        );
    }
}
export default contactData;