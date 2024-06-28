import React, { useState } from "react";
import { Link } from 'react-router-dom';
function Description({ title, image, text }) {
  const [isHovered, setIsHovered] = useState();
  return (
    <div
      className={` rounded-lg bg-[#f0efed]  relative z-1 shadow-xl shadow-slate-400`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
   
    >
      {isHovered ? (
        <Link to='/products'>
        <button className="bg-black text-white rounded-lg  absolute top-32 left-28 p-3 px-5 z-20 shadow-blue-900 shadow-lg ">
          View Now
        </button>
        </Link>
      ) : null}
      <img
        src={image}
        alt={title}
        className={`lg:h-64 lg:w-80 z-10  rounded-t-lg ${isHovered ? "opacity-60" : null}`}
      />
      <section>{text}</section>
      <p className="  font-bold text-3xl p-8">{title}</p>
    </div>
  );
}

export default Description;
