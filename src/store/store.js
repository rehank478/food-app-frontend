import {configureStore} from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {auth: authReducer, cart: cartReducer, admin: adminReducer}
});

export default store;