import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    admin: false,
    registerClicked: false,
    addItemClicked: true
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        login(state){
            state.admin = true;
        },
        logout(state){
            state.admin = false;
        },
        registerClickedToggle(state){
            state.registerClicked = true;
            state.addItemClicked = false;
        },
        addItemClickedToggle(state){
            state.registerClicked = false;
            state.addItemClicked = true;
        }
    }
});


export const adminActions = adminSlice.actions;

export default adminSlice.reducer;