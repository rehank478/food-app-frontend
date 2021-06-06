import Register from "./component/Sign/Register";
import {Route, Switch} from "react-router-dom";
import React, {useEffect} from "react";
import Login from "./component/Sign/Login";
import {useSelector, useDispatch} from "react-redux";
import { isAuthorized } from "./store/authSlice";
import Meals from "./component/Meals/Meals";
import Header from "./component/header/Header";
import classes from "./App.module.css";
import Cart from "./component/header/Cart";
import { cartActions, fetchCart, updateCart } from "./store/cartSlice";
import Order from "./Order/Order";
import Profile from "./component/Profile/Profile";
import Admin from "./component/Admin/Admin";

const  App =() => {
  // const isVerified = useSelector(state => state.auth.isVerified);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const isCartFetched = useSelector(state => state.cart.isCartFetched);

  useEffect(() => {
    dispatch(isAuthorized());
    dispatch(cartActions.cartIsFetched(false));
  }, [dispatch]);

  useEffect(() => {
    async function doFetch(){
      if(!isCartFetched){
        await dispatch(fetchCart());
        await dispatch(cartActions.cartIsFetched(true));
      }
    }
    doFetch();
  },[isCartFetched,dispatch]);

  // console.log(cart);
  useEffect(() => {
      if(isCartFetched){
        dispatch(updateCart(cart));
        // console.log("update", cart);
      }
  }, [cart,dispatch,isCartFetched]);

  
  
  

  
  const showCart = useSelector(state => state.cart.showCart);

  return (
    <div className={classes.app}> 
        <Header />
      
      {showCart && <Cart />}
      <Switch>
        <Route exact path="/">
            <Meals />
        </Route>
        <Route exact path='/register'>
            <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/checkout">
          <Order />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route exact path='/admin'> 
          <Admin />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
