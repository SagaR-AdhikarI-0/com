
import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { navitems } from "./headerdata";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../../Firebase/Firebase";
import MenuIcon from "@mui/icons-material/Menu";
import { logOut } from "../../Features/Authentication/Auth";
import CloseIcon from "@mui/icons-material/Close";
function Header() {
  const islogin = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  //for small device
  const [sideBar, setSideBar] = useState(false);

  const auth = getAuth(app);
  const handleLogout = () => {
    localStorage.setItem("loginStatus", JSON.stringify(false));
    console.log(islogin);
    dispatch(logOut());
  };

  return (
    <div className="flex justify-between   shadow-lg bg-slate-50  border-black  p-8 w-screen  sticky z-30  text-xl top-0 border-b ">
      <span className="text-4xl text-red-700">Logo</span>

      <div className="flex items-center gap-10">
        {navitems.map((a) => (
          <div className="" key={a.name}>
            <NavLink
              to={a.path}
              className={({ isActive }) =>
                isActive
                  ? ` ${a.hidden} lg:block md:block font-bold text-yellow-500 `
                  : `${a.hidden} lg:block md:block`
              }
              key={a.id}
            >
              {" "}
              {a.name}
            </NavLink>
          </div>
        ))}

        <div className="lg:hidden">
          <MenuIcon onClick={() => setSideBar(true)} fontSize="large" />
        </div>
        {sideBar ? (
          <div className="fixed flex-col justify-evenly h-screen z-50 w-10/12   bg-black text-white bg-opacity-95 right-0 top-0 ">
            {navitems.map((a) => (
              <div className="my-20" key={a.name}>
                <NavLink
                  to={a.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` font-bold text-yellow-500 `
                      : `null`
                  }
                  key={a.id}
                >
                  {" "}
                  {a.name}
                </NavLink>
              </div>
            ))}
            
            <div className="absolute top-2 right-2 "><CloseIcon  onClick={()=>setSideBar(false)}
            fontSize="large" className="font-bold text-red-700"/></div>
                    <button
            className="bg-red-600 rounded-lg   px-2 p-1 text-sm text-white hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
          </div>
     
        ) 
        : null}

        {islogin ? (
          <button
            className="bg-red-600 rounded-lg  hidden lg:block px-2 p-1 text-sm text-white hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
