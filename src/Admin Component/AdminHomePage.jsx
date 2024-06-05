import React from "react";
import { lists } from "./navlist";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignupForm from "../Components/Login/SignupForm";
import Sidebar from "./Home/Sidebar";

function AdminHomePage() {
  const islogin = useSelector((state) => state.auth.login);
return(
  <div>

  {
    islogin ? 
          <div className="grid grid-cols-[0.8fr,6fr]">
          <Sidebar/>
          <Outlet />
          </div>
        
     : 
      <div className="">
        <div className="grid grid-cols-[0.5fr,5fr]  gap-4">
          <div className="flex flex-col sticky gap-20 shadow-lg  p-10  ">
            {lists.map((icon) => (
              <NavLink
                key={icon.title}
                to={icon.link}
                className={({ isActive }) =>
                  isActive ? "bg-slate-200" : "hover:bg-slate-100 "
                }
              >
                {icon.icon}
              </NavLink>
            ))}
          </div>
          <SignupForm/>

        </div>
        

      </div>
    
  }
  </div>
)
}

export default AdminHomePage;
