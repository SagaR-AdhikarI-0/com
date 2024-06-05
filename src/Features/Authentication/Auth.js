import { createSlice } from "@reduxjs/toolkit";
export const authSlice=createSlice({
    name:"auth",
    initialState:{
        login:true,
    },
    reducers:{
        signup:(state)=>{
            state.login=true;

        },
        logOut:(state)=>{
            state.login=false;
        }
    }
})

export const {signup,logOut}=authSlice.actions
export default authSlice.reducer