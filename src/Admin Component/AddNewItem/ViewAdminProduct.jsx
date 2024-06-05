import React from "react";

function ViewAdminProduct({ category, image, title, price, description,onClose }) {
  return (
    <div className="fixed top-20 shadow-2xl shadow-black  lg:mx-52  ">
    <div className="grid  lg:grid-cols-[1fr,1.2fr]  font-bold  bg-slate-100  rounded-lg lg:gap-10 max-w-[800px] border border-black p-5">
      <div className="flex justify-center">
        <img src={image} alt={title} className="h-96 lg:h-96 p-4 lg:w-full" />
      </div>
      <div className="text-left max-w-96 flex flex-col justify-center">
        <h1 className="lg:text-2xl text-lg  ">{title}</h1>
       
        <p className="my-3 ">{description}.</p>
        <div className="text-blue-600 font-bold text-xl lg:text-2xl">
          Price:{price}
        </div>
        <hr></hr>
        <div className="my-3">
          <h1>Catagory: {category}</h1>
        </div>
        <div className="text-xl">
          <button className="bg-red-700 text-white p-3 px-16 rounded-xl m-2 ">Edit</button>
          <button className="bg-blue-600 text-white p-3 px-16 m-2 rounded-xl" onClick={onClose}> Close</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ViewAdminProduct;
