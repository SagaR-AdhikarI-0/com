import React from "react";
import { lists } from "../navlist";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
   
      <div className="flex sticky left-0 top-0 bg-stone-100 z-30 flex-col gap-y-32  h-screen w-40 shadow-lg  p-10   ">
        {lists.map((icon) => (
         
          <NavLink
            key={icon.title}
            to={icon.link}
            className={({ isActive }) =>
              isActive ? icon.title!=='Home'?"underline font-bold text-green-700":'hover:text-blue-800' : "hover:text-blue-800 "
            }
          >
            {icon.icon}
            <br></br>
            {icon.title}
          </NavLink>
         
        ))}
      </div>
   
  );
}

export default Sidebar;
