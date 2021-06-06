import {useSelector, useDispatch} from "react-redux";
import React from "react";
import Modal from "react-modal";
import { cartActions } from "../../store/cartSlice";
import classes from "./Cart.module.css";
// import Table from 'react-bootstrap/Table';
import {  useHistory } from "react-router";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, Button } from '@material-ui/core';

Modal.setAppElement("#root");


const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);
    const numberOfItems = useSelector(state => state.cart.numberOfItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const show = useSelector(state => state.cart.showCart);
    const isVerified = useSelector(state => state.auth.isVerified);
    const history = useHistory();

    const removeItemHandler = (id) => {
        dispatch(cartActions.removeItem(id));
    }

    const addItemHandler = (item) => {
        dispatch(cartActions.addItem(item));
    }


    // console.log(JSON.stringify(items[0]));
    var cartContent = <p>Add items to place order</p>;
    if(items.length > 0){
        cartContent = items.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>
                    <td>{isVerified && <IconButton onClick={addItemHandler.bind(null,item)} color="primary" aria-label="add to shopping cart">
                        <AddIcon />
                    </IconButton> }</td>
                    <td>
                    <IconButton onClick={removeItemHandler.bind(null,item.id)} color="secondary" aria-label="add to shopping cart">
                         <RemoveIcon />
                      </IconButton> 
                    </td>
                </tr>
            );
        });
    }

    const toggleHandler = () => {
        dispatch(cartActions.toggleCart());
    }

    const orderHandler = async () => {
        history.push('/checkout')
    }

    

    return (
        <Modal className={classes.Modal} isOpen={show} onRequestClose={toggleHandler} contentLabel="My dialog">
            <div className={classes.Table}>
                <table>
                    <thead>
                        <tr>
                            <th>Dish</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Add</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartContent} 
                    </tbody>
                </table>
            </div>
                    <h3>Total price: ₹ {totalPrice}</h3>
                    {(numberOfItems > 0) && <Button onClick={orderHandler} variant="contained" color="primary">Order</Button>}
                    <Button  variant="contained"  color="secondary" onClick={toggleHandler}>Close</Button>
                
      </Modal>
    );
}

export default Cart;
  