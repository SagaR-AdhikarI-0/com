import React, { useState } from "react";

import StarRating from "../Star";
import { Link } from "react-router-dom";

function Product({ title, src, discription, price, id }) {
  const [ishovered, setIsHovered] = useState();
  const handleAddToCart = () => {
    try {
      const existingCartItemsId = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
      if (!existingCartItemsId.includes(id)) {
        const updatedCartItemsId = [...existingCartItemsId, id];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItemsId));
      } else {
        alert("Item already added to the  cart");
      }

      console.log(updatedCartItemsId);
    } catch (error) {
      console.log(error);
    }
  };

  //view Items

  //

  return (
    <div
      className={`grid place-content-center gap-2 max-w-[80%] transform-gpu transition-transform mx-auto p-2 min-w-[80%] my-4 bg-slate-100  shadow-2xl  ${
        ishovered ? " scale-110" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex place-content-center">
        <img src={src} className="w-40 h-40" alt={title} />
      </div>
      <div>
        <h1 className="font-bold text-red-700"> {title}</h1>
        <p>{discription}</p>
        <h1 className="font-bold p-2"> Price:${price}</h1>
        <h1 className="line-through"> ${price + 20}</h1>
        <div className="flex justify-center">
          <StarRating />
        </div>
      </div>
      <div className="flex  w-full place-content-center gap-1">
        <button className="bg-orange-600 hover:bg-green-600 p-3 lg:px-10  rounded-lg shadow-lg text-white  ">
          {" "}
          <Link  to={`/products/${id}`}>ViewItem </Link>
        </button>

        <button
          className="bg-slate-900 hover:bg-slate-600 rounded-lg shadow-lg p-3 lg:px-5 text-white"
          onClick={() => handleAddToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
