import { createSlice } from "@reduxjs/toolkit";
export const  cartSlice=createSlice({
    name:"cart",
    initialState:
    {
        items:[]
    },
    reducers:{
        electronics:(state)=>{}
    }
})
export const {addTocart}=cartSlice.actions
export default cartSlice.reducer