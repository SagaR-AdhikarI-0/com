import React from "react";
import { lists } from "../navlist";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
   
      <div className="flex sticky left-0 top-0 bg-stone-100 z-30 flex-col gap-20 h-screen w-40 shadow-lg  p-10   ">
        {lists.map((icon) => (
          <NavLink
            key={icon.title}
            to={icon.link}
            className={({ isActive }) =>
              isActive ? "bg-slate-200 w-[100%]" : "hover:bg-slate-100 "
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
