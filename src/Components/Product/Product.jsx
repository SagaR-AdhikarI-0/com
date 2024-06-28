import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTocart } from "../../Features/Cart/cartSlice";

import StarRating from "../Star";
import { Link } from "react-router-dom";

function SingleProduct({ title, src, price, id }) {
  const dispatch = useDispatch();
  const [ishovered, setIsHovered] = useState();
  const handleAddToCart = () => {
    try {
      const existingCartItemsId = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
      if (!existingCartItemsId.includes(id)) {
        const updatedCartItemsId = [...existingCartItemsId, id];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItemsId));
        toast.success("Added  Successfully");
        console.log(updatedCartItemsId);
        dispatch(addTocart(id));
      } else {
        toast.error("Item already in teh  cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`grid place-content-center gap-2  overflow-hidden shadow-2xl border transform-gpu transition-transform mx-auto my-4    ${
        ishovered ? " scale-110" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex ">
        <Link to={`/products/${id}`}>
          <img src={src} className="lg:w-72 h-36 md:h-60  lg:h-60 " alt={title} />
        </Link>
      </div>
      <div className="grid text-left gap-2 lg:px-3 px-2 py-3">
        <span className="font-bold  text-xl max-w-56"> {title}</span>

        <StarRating />
        <span className="text-blue-600 ">Free Delivery</span>
        <span className="font-bold text-red-700 text-xl grid lg:block">
          {" "}
          <span>
          Price:Rs.{price}{" "}
          </span>
          <span className="line-through text-sm lg:ml-5 text-[#7d7b7b]">
            {" "}
            Rs.{price + 20}
          </span>{" "}
        </span>
      </div>
    </div>
  );
}
const Product = memo(SingleProduct);

export default Product;
