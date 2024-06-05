import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { navitems } from "./headerdata";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../../Firebase/Firebase";
import { logOut } from "../../Features/Authentication/Auth";
function Header() {
  const islogin = useSelector(state=>state.auth.login)
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleLogout=()=> 
    {console.log(islogin)
   dispatch(logOut())

     
    };
 

  
  return (
    <div className="flex justify-between bg-slate-100 shadow-lg p-4 sticky z-30  text-xl top-0 ">
      <span className="text-3xl text-red-700">Logo</span>

      <div className="flex">
        {navitems.map((a) => (
          <NavLink
            to={a.path}
            className={({ isActive }) => (isActive ? `   font-bold ` : "")}
            key={a.id}
          >
            <div className={`text-black px-16 ${a.hidden} lg:block md:block`}>
              {a.name}
            </div>
          </NavLink>
        ))}
        {islogin?(
          <button
            className="bg-red-600 rounded-lg p-1 px-2 text-sm text-white hover:bg-red-700"
           onClick={handleLogout}
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
