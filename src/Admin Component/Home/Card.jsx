import React from "react";
import {navitems} from '../../Components/Header/headerdata'
function Card() {
  return (
   
      <div className="border border-black  m-1 rounded-3xl text-2xl my-4 shadow-yellow-500 shadow-2xl">
        <h1 className="font-bold">Your Profit</h1>
        <div className="text-lg">From catagory</div>
        <div className="grid place-content-center">
        <div className=" grid grid-cols-2 text-lg    ">
            <div className=" text-pretty text-left  text-blue-900">
               <h1>Men's Clothing</h1>
               <h1>Women's Clothing</h1>
               <h1>Electronics</h1>
               <h1>Jewelery</h1>
               <h1 className="font-bold text-rose-800">Total:</h1>
            </div>
            <div className=" text-red-900 text-right">
                <h1>:$200</h1>
                <h1>:$800</h1>
                <h1>:$933</h1>
                <h1>:$1022.5</h1>
               <span className="font-bold text-gray-900">${200+800+933+1022.5}</span> 
            </div>
        </div>
        </div>
      </div>
   
  );
}

export default Card;
