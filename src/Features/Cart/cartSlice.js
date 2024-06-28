import { createSlice } from "@reduxjs/toolkit";
export const  cartSlice=createSlice({
    name:"cart",
    initialState:
    {
        items:JSON.parse(localStorage.getItem("cartItems")||[])
    },
    reducers:{
        addTocart:(state,action)=>{state.items.push(action.payload)}
    }
})
export const {addTocart}=cartSlice.actions
export default cartSlice.reducer