import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { cartActions } from "../../store/cartSlice";
import classes from "./Header.module.css";
import { IconButton, Button, Link } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { authActions } from "../../store/authSlice";
import { Redirect } from "react-router";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from "react-router-dom";
import { adminActions } from "../../store/adminSlice";
import mealsImage from "../../meals.jpg";



const Header = (props) => {
    const dispatch = useDispatch();
    const isVerified = useSelector(state => state.auth.isVerified);
    const admin = useSelector(state => state.admin.admin);
    const [logoClicked, setLogoClicked] = useState(false);
    const numberOfItems = useSelector(state => state.cart.numberOfItems);
    const [loginClass,setLoginClass] = useState(classes.link);
    const [registerClass,setRegisterClass] = useState(classes.link);
    const [adminClass,setAdminClass] = useState(classes.link);
    const [aregisterClass, setaRegisterClass] = useState(classes.link);
    const [newDishClass, setNewDishClass] = useState(classes.link);
    
 

    const history = useHistory();
    const showCartHandler = () => {
        dispatch(cartActions.toggleCart());
        setLogoClicked(false);
    }

    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        dispatch(adminActions.logout());
        localStorage.removeItem('AdminToken');
    }

    const signinHandler = () => {
        history.push('login');
        setLoginClass(`${classes.link} ${classes.active}`);
        setRegisterClass(`${classes.link}`);
        setAdminClass(`${classes.link}`);
    }

    const signupHandler = () => {
        history.push('register');
        setLoginClass(`${classes.link} `);
        setRegisterClass(`${classes.link} ${classes.active}`);
        setAdminClass(`${classes.link}`);
    }

    const logoClickedHandler = () => {
        history.push('/');
    }

    const profileClickHandler = () => {
        let path = `profile`; 
        history.push(path);
          
    }

    const registerClickHandler = () => {
        dispatch(adminActions.registerClickedToggle());
        history.push('admin');
        setaRegisterClass(`${classes.link} ${classes.active}`);
        setNewDishClass(`${classes.link}`);
    }

    const addItemClickHandler = () => {
        dispatch(adminActions.addItemClickedToggle());
        history.push('admin');
        setNewDishClass(`${classes.link} ${classes.active}`);
        setaRegisterClass(`${classes.link}`);
    }


    const adminClickHandler = () => {
        history.push('admin');
        setNewDishClass(`${classes.link} ${classes.active}`);
        setLoginClass(`${classes.link} `);
        setRegisterClass(`${classes.link} `);
        setAdminClass(`${classes.link} ${classes.active}`);
    }


    return (
        <React.Fragment>
            <div className={classes.nav}>
                <div>
                <IconButton onClick={logoClickedHandler} aria-label="User Profile">
                        <b className={classes.logo}>Food App</b>
                    </IconButton>
                    
                </div>
                <div className={classes.headerButtons} >
                    {isVerified && !admin && <IconButton onClick={showCartHandler} color="primary" aria-label="add to shopping cart">
                        {numberOfItems > 0 && <p className={classes.number}>{numberOfItems}</p>}
                        <AddShoppingCartIcon />
                    </IconButton>}
                    {admin && 
                        <Link onClick={registerClickHandler} className={aregisterClass}>
                            Create New Admin
                        </Link>
                    }
                    {admin && 
                        <Link onClick={addItemClickHandler} className={newDishClass}>
                            Add New Dish
                        </Link>
                    }
                    {!isVerified && !admin && <Link className={loginClass} onClick={signinHandler}>Login</Link>}
                    {!isVerified && !admin && <Link className={registerClass} onClick={signupHandler} >Register</Link>}
                    {(isVerified || admin) && <Button onClick={logoutHandler} variant="contained" color="secondary">Logout</Button>}
                    {logoClicked && <Redirect to='/' />}
                    {isVerified && !admin && <IconButton onClick={profileClickHandler} color="primary" aria-label="User Profile">
                        <AccountCircleIcon />
                    </IconButton>}
                    
                    {!isVerified && !admin &&
                        <Link onClick={adminClickHandler} className={adminClass}>
                            Admin
                        </Link>
                    }
                </div>
            </div>
            <div className={classes.image}>
                <img src={mealsImage} alt="meals"/>
            </div>
        </React.Fragment>
    );
}

export default Header;