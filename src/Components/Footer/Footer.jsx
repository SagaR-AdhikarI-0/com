import React from "react";

function Footer() {
  return (
    <div className="">
      <div className="bg-[#f0f0f0]  text-black grid grid-cols-2 lg:grid-cols-[3fr,2fr,2fr,2fr] place-content-start py-16 pt-20 z-100  ">
        <div className=" lg:px-20 my-auto text-6xl font-bold text-left px-3">Logo
          <p className="text-lg  font-normal p-3 mt-4 text-[#979797]">
            We hav the best products and the best costumer services
          </p>
          
        </div>
        <div className="grid">
          <h1 className="text-lg lg:text-left underline font-bold">
            Our Services
          </h1>
          <ul className="lg:text-left text-[#979797]">
            <li>Quality products</li>
            <li>Satisfying</li>
            <li>Fast Services</li>
            <li>Amazing deals</li>
            <li>Friendly staffs</li>
          </ul>
        </div>
        <div className="mt-4 lg:mt-0"> 
          <h1 className="font-bold text-xl underline">Products</h1>
          <ul className="p-4 text-[#979797]">
            <li>Men's Fashion</li>
            <li>Women's Fashion</li>
            <li>Electronics</li>
            <li>Toys</li>
          </ul>
        </div>

        <div>
          <h1 className="underline text-xl font-bold"> Branches</h1>
          <ul className="p-4 text-[#979797]">
            <li>Lalitpur</li>
            <li>Kathmandu</li>
            <li>Pokhara</li>
            <li>Chitwan</li>
            <li>Dharan</li>
            <li>Arghakhachi</li>
            <li>Gorkha</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
