import React,{useState} from "react";
import Loader from "./Loader/Loader";
import { useForm } from "react-hook-form";
import Cancel from "@mui/icons-material/Cancel";
import { fireDb } from "../../Firebase/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";
import {toast } from 'react-toastify';
import {createPortal} from 'react-dom'
function BuyNow({ setClose, SendId,onClickingCross}) {

const[isLoading,setIsLoading]=useState(false);

const handleCloseIconClick=()=>{
  setClose()
  onClickingCross()
}
  const onSubmit = (data) => {
    setIsLoading(true)
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    function addZeroPrefix(number) {
      return (number < 10 ? "0" : "") + number;
    }


    var formattedDate =
      year +
      "-" +
      addZeroPrefix(month) +
      "-" +
      addZeroPrefix(day) +
      " " +
      addZeroPrefix(hours) +
      ":" +
      addZeroPrefix(minutes) +
      ":" +
      addZeroPrefix(seconds);
      
      //what to do when the close icon is clicked
   

    const OrderRefrence = collection(fireDb, "Orders");
    addDoc(OrderRefrence, {
      costumer: data.name,
      phone_number: data.phone,
      email: data.email,
      address: data.address,
      itemsId: SendId,
      orderId: nanoid(10),
      date: formattedDate,
    }).then(()=>{setIsLoading(false) 
      toast.success('Order Placed Succesfully!')
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return createPortal(
    <div className={`absolute lg:top-32  lg:left-[25%]  max-w-screen-sm lg:max-w-screen-lg top-32 shadow-2xl shadow-red-800 `}>
      <div className="flex justify-end relative z-40">
        <Cancel
          className="absolute lg:top-[-10px] lg:right-[-10px] font-bold cursor-pointer"
          onClick={handleCloseIconClick}
          fontSize="large"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white z-10 lg:w-[780px]   border lg:h-[75vh] shadow-2xl shadow-red-700  border-black overflow-y-scroll lg:p-16 px-14 py-10 text-xl text-left"
      >
        <div className="my-4">
          <label htmlFor="Name"> Name: </label>
          <br />
          <input
            type="text"
            placeholder="Enter your Name"
            {...register("name")}
            className="p-3 w-full border border-black "
          />
        </div>
        <div className="my-4">
          <label htmlFor="Phone Number">Phone Number:</label>
          <br />
         
          <input
            type="number"
            placeholder="Enter Your Phone number"
            {...register("phone")}
            className="p-3 w-full  border-black border"
          />
        </div>
        <div className="my-4">
          <label htmlFor="Email"> Email:</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="p-3 w-full  border-black border"
          />
        </div>
        <div className="my-4">
          <label htmlFor="Address">Address:</label>
          <br />
           <div className="absolute left-[40%] top-[40%] ">


          {isLoading && <Loader/>}
           </div>
          <input
            type="text"
            placeholder="Enter Your Address"
            {...register("address")}
            className="p-3 w-full border border-black"
          />
        </div>
        <div className="mt-8">
          
          <button
            type="submit"
            className="bg-red-700 text-white p-3 rounded-lg w-full"
          >
            Place your order
          </button>
        </div>
      </form>
    </div>,document.getElementById("modal")
  );
}

export { BuyNow };
