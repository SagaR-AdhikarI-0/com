import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { signup } from "../../Features/Authentication/Auth";
import { fireDb } from "../../../Firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
function SignupForm({handleAlreadyHaveAnAccount}) {
  const admin ={
    email:"admin@gmail.com",
    password:'admin123'
  }
  const dispatch = useDispatch();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, event) => {
    const userRefrence = collection(fireDb, "user");
    addDoc(userRefrence, {
      email: data.email,
      password:data.password
    });

    setPersistence(auth, browserSessionPersistence).then(() => {
      createUserWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          const user = userCredential.user;
          const token = user.accessToken;
          dispatch(signup());
          localStorage.setItem('loginStatus',JSON.stringify(true))
          if(data.email===admin.email && data.password=== admin.password)
            {
              localStorage.setItem('isAdmin',JSON.stringify(true))
            }
            else{
              localStorage.setItem('isAdmin',JSON.stringify(false))
            }
        }
      );
    });
  };
  return (
    <div className="  bg-slate-50  flex justify-center h-screen ">
      <form
        className="lg:min-w-[530px] text-xl font-semibold flex flex-col gap-6  text-left border p-10 my-auto shadow-lg shadow-black rounded-lg "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid justify-center">
          <p className="flex justify-center">
            <AccountCircleIcon style={{ fontSize: 60 }} />
          </p>
          <p>Create an Account </p>
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
            <p role="alert">Email is required</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br></br>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg border-gray-900 border"
            {...register("password", { required: true, minLength: 6 })}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            value="Signup"
            className="bg-blue-500 px-14 py-2 rounded-lg shadow-2xl  text-white"
          >
            SignUp
          </button>
        </div>
        <div>
          <div className="flex justify-center text-red-600">
            <p>Already have an account?</p>
          </div>
          <div className="flex justify-center font-Normal text-blue-500 text-xl hover:text-blue-600 cursor-pointer">
            <h1 onClick={handleAlreadyHaveAnAccount}>Login</h1>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
