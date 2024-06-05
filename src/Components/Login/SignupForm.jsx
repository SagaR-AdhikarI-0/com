import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../Firebase/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../Features/Authentication/Auth";
function SignupForm() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, event) => {
    if (event.nativeEvent.submitter.value === "Signup") {
      createUserWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          
          const user = userCredential.user;
          dispatch(signup());
        }
      );
    }
  };
  return (
    <div className="lg:mt-[30vh] bg-slate-100 shadow-2xl flex justify-center ">
      <form
        className="max-w-[400px] text-left bg-slate-200 p-5 shadow-2xl rounded-lg m-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>Email:</label>
          <br />
          <input
            {...register("email")}
            type="email"
            placeholder="abc@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br></br>

          <input type="password" {...register("password")} />
        </div>
        <div>
          <button type="submit" value="Signup">
            SignUp
          </button>

          <button>Login</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
