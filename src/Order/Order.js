import {TextField, Button} from "@material-ui/core";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import classes from "./Order.module.css";
const queryString = require('query-string');

const Order = () => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [error, setError] = useState(null);
    const [formIsValid, setFormIsValid] = useState();
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cartActions.hideCart());
    },[dispatch])

    useEffect(() => {
        if(formIsValid){
            async function sendForm(){
                const x = localStorage.getItem('token');
                await axios.post('order', queryString.stringify(formData), {
                    headers:{
                        token: x
                    }
                }).then(response => {
                    // console.log("placing Order ",   response.data);
                    setSuccess(true);
                    dispatch(cartActions.resetCart());
                }).catch(err => {
                    console.log(err);
                });
            }
            sendForm();
        }
    }, [formData,formIsValid,dispatch])


    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const mobileChangeHandler = (event) => {
        setMobile(event.target.value);
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const streetChangeHandler = (event) => {
        setStreet(event.target.value);
    }

    const cityChangeHandler = (event) => {
        setCity(event.target.value);
    }

    const postalCodeChangeHandler = (event) => {
        setPostalCode(event.target.value);
    }
    
    const formSubmissionHandler = (event) => {
        event.preventDefault();
        setError(null);
        if(name.length === 0){
            setError("Name must not be empty");
            return;
        }
        if(mobile.length !== 10){
            setError("Enter a valid mobile number");
            return;
        }
        if(!(/\S+@\S+\.\S+/.test(email))){
            setError("Invalid Email");
            return;
        }
        if(street.length === 0){
            setError("Street must not be empty");
            return;
        }
        if(city.length === 0){
            setError("City must not be empty");
            return;
        }
        if(postalCode.length !== 6){
            setError("Invalid Postal Code Should be of 6 digits");
            return;
        }
        const data = {
            name: name,
            email: email,
            mobile: mobile,
            street: street,
            city: city,
            postalCode: postalCode
        }
        setFormIsValid(true);
        setFormData(data);
    }
    

    return(
        <React.Fragment>
            {!success && <form className={classes.Form}>
                <h2>Checkout Form</h2>
                {error && <p className={classes.error}>*{error}</p>}
                <TextField value={name} onChange={nameChangeHandler}  id="outlined-basic" required margin='normal' label="Name" variant="outlined" />
                <TextField value={mobile} onChange={mobileChangeHandler} id="outlined-basic" required margin='normal' type='Number' label="Mobile No." variant="outlined" />
                <TextField value={email} onChange={emailChangeHandler}  id="outlined-basic" required margin='normal' type='email'  fullWidth label="email" variant="outlined" />
                <TextField value={street} onChange={streetChangeHandler} id="outlined-basic" required margin='normal' fullWidth label="street" variant="outlined" />
                <TextField value={city} onChange={cityChangeHandler} id="outlined-basic" required margin='normal' label="city" variant="outlined" />
                <TextField value={postalCode} onChange={postalCodeChangeHandler} id="outlined-basic" required margin='normal' label="Postal Code" variant="outlined" />
                <div className={classes.actions}>
                    <Button onClick={formSubmissionHandler} variant="contained" size="large" color="primary" className={classes.margin}>Submit</Button>
                    <Button  variant="contained" size="large" color="secondary" className={classes.margin}>Cancel</Button>
                </div>
            </form>}
            {success && <p>Order Placed Successfully</p>}
        </React.Fragment>
    );
}

export default Order;