import {createSlice} from "@reduxjs/toolkit";
import axios from "../axios";
const queryString = require('query-string');

const intialCart = {
    items: [],
    totalPrice: 0,
    numberOfItems: 0,
    showCart: false,
    isCartFetched: false
}
const cartSlice = createSlice({
    name: "cart",
    initialState: intialCart,
    reducers: {
        addItem(state, action){
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            const existingCartItem = state.items[existingCartItemIndex];
            if(!existingCartItem){
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    description: action.payload.description,
                    amount: 1
                });
            }else{
                state.items[existingCartItemIndex].amount += 1;
            }
            state.totalPrice += action.payload.price;
            state.numberOfItems += 1;
        },
        removeItem(state,action){
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload);
            const existingCartItem = state.items[existingCartItemIndex];
            if(existingCartItem.amount === 1){
                state.items = state.items.filter(item => item.id !== action.payload);
            }else{
                state.items[existingCartItemIndex].amount -= 1;
            }
            state.totalPrice -= existingCartItem.price;
            state.numberOfItems -= 1;
            if(state.numberOfItems === 0) state.totalPrice = 0;
        },
        toggleCart(state){
            state.showCart = !state.showCart;
        },
        hideCart(state){
            state.showCart = false;
        },
        cartIsFetched(state,action){
            state.isCartFetched = action.payload;
        },
        replaceCart(state,action){
            // console.log(action.payload.data);
            state.items = action.payload.numberOfItems === 0 ? [] : action.payload.items;
            state.totalPrice = action.payload.totalPrice;
            state.numberOfItems = action.payload.numberOfItems;
        },
        resetCart(state){
            state.items = [];
            state.totalPrice = 0;
            state.numberOfItems = 0;
        }
    },
    
});


export const updateCart = (data) => {
    return async (dispatch) => {
        var x = await localStorage.getItem("token");
        var y = await localStorage.getItem("email");
        const sendCart = {
            email: y,
            newItem: await JSON.stringify(data)
        }
        
        await axios.post('cart', queryString.stringify(sendCart), {
            headers:{
                token: x
            }
        }).then(response => {
            // console.log("update",   response);
        }).catch(err => {
            //
        });
    }
}

export const fetchCart = () => {
    return async (dispatch) => {
        var y = localStorage.getItem("email");
        var x = localStorage.getItem("token");
        await axios.get('cart',{
            headers:{
                token: x,
                email: y
            }
        }).then(response => {
            dispatch(cartActions.replaceCart(response.data));
        }).catch(err => {
            //
        });
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;