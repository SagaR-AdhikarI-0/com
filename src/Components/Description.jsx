import React, { useState } from "react";
import { Link } from 'react-router-dom';
function Description({ title, image, text }) {
  const [isHovered, setIsHovered] = useState();
  return (
    <div
      className={`bg-slate-200 rounded  relative z-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Link to='/products'>
        <button className="bg-green-700 text-white rounded-lg  absolute top-32 left-28 p-3 px-5 z-20 shadow-blue-900 shadow-lg ">
          View Now
        </button>
        </Link>
      ) : null}
      <img
        src={image}
        alt={title}
        className={`lg:h-64 lg:w-80 z-10 p-3 ${isHovered ? "opacity-60" : null}`}
      />
      <a>{text}</a>
      <p className="text-blue-800 font-bold text-xl p-3">{title}</p>
    </div>
  );
}

export default Description;
