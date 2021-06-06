import {createSlice} from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
    isVerified: false,
    admin: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state){
            state.isVerified = true;
        },
        logout(state){
            state.isVerified = false;
        },
        adminLogin(state){
            state.admin = true;
        }
    }
});


export const isAuthorized = () => {
    return (dispatch) => {
        var x = localStorage.getItem("token");
        axios.get('check', {
            headers:{
                token: x,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            dispatch(authActions.login());
        }).catch(({response}) => {
            dispatch(authActions.logout());
        });
    }
}


export const authActions = authSlice.actions;

export default authSlice.reducer;