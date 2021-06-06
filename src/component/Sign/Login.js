import React, {useState} from "react";
import axios from "../../axios";
import queryString from 'query-string';
import { useDispatch, useSelector} from "react-redux";
import { authActions } from "../../store/authSlice";
import {Redirect} from "react-router";
import { cartActions} from "../../store/cartSlice";
import {TextField, Button} from "@material-ui/core";
import classes from "./Login.module.css";



const Login = (props) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const isVerified = useSelector(state => state.auth.isVerified);


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
            email: email,
            password: password
        };
        // console.log(data);
        const response = await axios.post('login',queryString.stringify(data));
        if(response.data.token === undefined) setError(response.data);
        else{
            dispatch(authActions.login());
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", data.email);
            dispatch(cartActions.cartIsFetched(false));
        }
        setSuccess(true);
    }


    return(
        <React.Fragment>
            {isVerified && <Redirect to='/' />}
            <form className={classes.Form} type="submit">
                <h1>Login Form</h1>
                {error && <p className={classes.error}>{error}</p>}
                {!error && success && <Redirect to='/' />}
                <TextField value={email} fullWidth onChange={emailHandler}  id="email" required margin='normal' label="Email" variant="outlined" />
                {/* <label>Email : <input onChange={emailHandler} value={email} type="email" name="email" /></label> */}
                <TextField value={password} fullWidth onChange={passwordHandler} type='password' id="pass" required margin='normal' label="Password" variant="outlined" />
                {/* <label>Password : <input onChange={passwordHandler} value={password} type="password" name="password" /></label> */}
                <Button type="submit" className={classes.but} onClick={formSubmitHandler} variant="contained" size="large" color="primary" >Login</Button>
            </form>
        </React.Fragment>
    );
}

export default Login;