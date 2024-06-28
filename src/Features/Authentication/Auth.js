import { createSlice } from "@reduxjs/toolkit";
export const authSlice=createSlice({
    name:"auth",
    initialState:{
        login: JSON.parse(localStorage.getItem('loginStatus')),
        isAdmin:JSON.parse(localStorage.getItem("isAdmin")),
    },
    reducers:{
        signup:(state,action)=>{
            state.login=true;
           

        },
        logOut:(state)=>{
            state.login=false;
        }
    }
})

export const {signup,logOut}=authSlice.actions
export default authSlice.reducer