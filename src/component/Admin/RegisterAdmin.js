import React, {useState} from "react";
import axios from "../../axios";
import { Redirect } from 'react-router'
import { useSelector } from "react-redux";
import {TextField, Button} from "@material-ui/core";
import classes from "./Admin.module.css";
const queryString = require('query-string');




const Register = (props) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const isVerified = useSelector(state => state.auth.isVerified);

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const formSubmitHandler = async (event) => {
        setError(null);
        setSuccess(false);
        event.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password
        };
        const response = await axios.post('registerAdmin',queryString.stringify(data));
        if(response.data.user === undefined) setError(response.data);
        else{
            setSuccess(true);
            setName('');
            setEmail('');
            setPassword('');
        }
        
    }


    return(
        <React.Fragment>
            {isVerified && <Redirect to='/' />}
            <form className={classes.Form} type="submit">
                <h1>Registration Form</h1>
                {error && <p className={classes.error}>{error}</p>}
                {!error && success && <p>User created successfully</p>}
                <TextField value={name} fullWidth onChange={nameHandler}  id="name" required margin='normal' label="Name" variant="outlined" />
                <TextField value={email} fullWidth onChange={emailHandler}  id="email" required margin='normal' label="Email" variant="outlined" />
                <TextField value={password} fullWidth onChange={passwordHandler} type='password' id="pass" required margin='normal' label="Password" variant="outlined" />
                <Button className={classes.but} onClick={formSubmitHandler} variant="contained" size="large" color="primary" >Register</Button>
            </form>
        </React.Fragment>
    );
}

export default Register;