import React from "react";
import axios from "../../axios";
import { useEffect, useState } from "react";
import {TextField, Button} from "@material-ui/core";
import classes from "./Admin.module.css";
import queryString from 'query-string';
import Register from "./RegisterAdmin";
import AddItems from "./AddItems";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../store/adminSlice";



const Admin = () => {
    const isVerified = useSelector(state => state.admin.admin);
    const dispatch = useDispatch();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);
    const registerClicked = useSelector(state => state.admin.registerClicked);
    const addItemClicked = useSelector(state => state.admin.addItemClicked);
    useEffect(() => {
        const x = localStorage.getItem('AdminToken');
        axios.get('/isAdmin', {
            headers: {
                AdminToken : x
            }
        }).then(response => {
            dispatch(adminActions.login());
        }).catch(err => {
            dispatch(adminActions.logout());
        });
    }, [dispatch]);


    const emailHandler = (event) => {
        setEmail(event.target.value);
    }


    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password
        };
        // console.log(data);
        const response = await axios.post('checkAdmin',queryString.stringify(data));

        if(response.data.Admintoken === undefined) setError(response.data);
        else{
            dispatch(adminActions.login());
            // console.log(response);
            localStorage.setItem('AdminToken', response.data.Admintoken);
            setError('');
            setEmail('');
            setPassword('');
        }
    }


    let content = (
        <form className={classes.Form} type="submit">
                <h1>Admin Login Form</h1>
                {error && <p className={classes.error}>{error}</p>}
                <TextField value={email} fullWidth onChange={emailHandler}  id="email" required margin='normal' label="Email" variant="outlined" />
                <TextField value={password} fullWidth onChange={passwordHandler} type='password' id="pass" required margin='normal' label="Password" variant="outlined" />
                <Button type="submit" className={classes.but} onClick={formSubmitHandler} variant="contained" size="large" color="primary" >Login</Button>
        </form>
    );

    

    return(
        <div className={classes.admin}>
            {!isVerified && content}
            {isVerified && registerClicked && <Register />}
            {isVerified && addItemClicked && <AddItems />}
        </div>
    );
}

export default Admin