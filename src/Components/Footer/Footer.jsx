import React from "react";

function Footer() {
  return (
    <div className="mt-4">
      <div className="bg-teal-200 text-black grid grid-cols-2 lg:grid-cols-[3fr,2fr,2fr,2fr] place-content-start p-4 z-100 border-t-2 border-black ">
        <div className="lg:flex lg:px-20 my-auto text-6xl ">Logo</div>
        <div className="grid">
          <h1 className="text-lg text-black lg:text-left underline font-bold">
            Our Services
          </h1>
          <ul className="lg:text-left">
            <li>Quality products</li>
            <li>Satisfying</li>
            <li>Fast Services</li>
            <li>Amazing deals</li>
            <li>Friendly staffs</li>
          </ul>
        </div>
        <div className="mt-4 lg:mt-0"> 
          <h1 className="font-bold text-lg">Products</h1>
          <ul>
            <li>Men's Fashion</li>
            <li>Women's Fashion</li>
            <li>Electronics</li>
            <li>Toys</li>
          </ul>
        </div>

        <div>
          <h1> Branches</h1>
          <ul>
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
