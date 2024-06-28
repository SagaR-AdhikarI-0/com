import React, { useState } from "react";
import { lists } from "./navlist";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignupForm from "../Components/Login/SignupForm";
import Sidebar from "./Home/Sidebar";
import Login from "../Components/Login/Login";

function AdminHomePage() {
  const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(false);
  //onchicking the already have an account
  const handleAlreadyHaveAnAccount = () => {
    setAlreadyHaveAccount(true);
  };
  const handleDoNotHaveAccount = () => {
    setAlreadyHaveAccount(false);
  };
  const islogin = useSelector((state) => state.auth.login);
  return (
    <>
      {islogin ? (
        <div className="grid grid-cols-[0.8fr,6fr]">
          <Sidebar />
          <Outlet />
        </div>
      ) : alreadyHaveAccount ? (
        <Login handleDoNotHaveAccount={handleDoNotHaveAccount} />
      ) : (
        <SignupForm handleAlreadyHaveAnAccount={handleAlreadyHaveAnAccount} />
      )}
    </>
  );
}

export default AdminHomePage;
