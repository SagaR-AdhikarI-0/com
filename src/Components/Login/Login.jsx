
import React, { useState } from "react";
import {useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from "react-redux";
import { signup } from "../../Features/Authentication/Auth";
import { Link, useNavigate } from "react-router-dom";

function Login({handleDoNotHaveAccount}) {
    const admin ={
      email:"admin@gmail.com",
      password:'admin123'
    }
   
    const navigate=useNavigate();
    const [Erorrs,setErrors]=useState()
    const dispatch=useDispatch();
    const onSubmit= (data)=>{
     
        try{
        const auth=getAuth();
        signInWithEmailAndPassword(auth,data.email,data.password).then((userCredential)=>{
            const user=userCredential.user
            if(data.email===admin.email && data.password===admin.password)
              {
                dispatch(signup())
                localStorage.setItem('isAdmin',JSON.stringify(true))
                localStorage.setItem('loginStatus',JSON.stringify(true))
              
                navigate('/admin')
              }
              else{
                dispatch(signup())
                localStorage.setItem('isAdmin',JSON.stringify(false))
                localStorage.setItem('loginStatus',JSON.stringify(true))
                navigate('/')
              
              }
           
           
        }).catch((error)=>{
            setErrors(true)
        })
    }
 catch (error) {
        console.log(error)
        
    }
    }

    const {register,handleSubmit,formState:{errors}}=useForm()
  return ( <>
    <div className="  bg-slate-50  grid justify-center h-screen ">
    <form
      className="lg:min-w-[530px] text-xl font-semibold flex flex-col gap-6  text-left border p-10 my-auto shadow-lg shadow-black rounded-lg "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid justify-center">
        <p className="flex justify-center"><LoginIcon className="" style={{fontSize:55}}/></p>
        <p>Login to Your Account </p>
      </div>
      <div>
        <label>Email:</label>
        <br />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="abc@gmail.com"
          className="w-full p-3 rounded-lg  border-gray-900 border"
        />
        {errors.email?.type === "required" && (
          <p className="text-[16px] text-red-600 px-1" role="alert">Email is required</p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <br></br>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg border-gray-900 border"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.type==='required'&& (
            <p className="text-red-600 text-[16px] px-1" role="alert">Password is required</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          value="SignIn"
          className="bg-blue-500 px-14 py-2 rounded-lg shadow-2xl  text-white"
        >
          Login
        </button>
      </div>
      <div>
        <div className="flex justify-center text-red-600">
          <p>Don't have an account?</p>
        </div>
        <div className="flex justify-center font-Normal text-blue-500 text-xl hover:text-blue-600 cursor-pointer">
          <h1 onClick={handleDoNotHaveAccount}>Sign Up</h1>
        </div>
      </div>
    </form>
    {Erorrs?<p className="text-xl text-red-700">User Not Found....</p>:''}
  </div>

  </>
  )
}

export default Login