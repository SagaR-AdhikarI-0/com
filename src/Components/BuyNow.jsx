import React from "react";
import { useForm } from "react-hook-form";
import Cancel from "@mui/icons-material/Cancel";
import { fireDb } from "../../Firebase/Firebase";
import { collection,getDocs,addDoc} from "firebase/firestore";

function BuyNow({setClose}) {
  const onSubmit = (data) => {
    const OrderRefrence =collection(fireDb,'Orders');
    addDoc(OrderRefrence,{
        costumer:data.name,
        phone_number:data.phone,
        email:data.email,
        address:data.address,
    })


  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 
  return (
    <div className="fixed top-32 left-[32%]">
        <div className="flex justify-end relative z-40">
        <Cancel className="absolute top-[-10px] right-[-10px] font-bold cursor-pointer"  onClick={setClose} fontSize="large"/>
        </div>
       
    
    <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-100 rounded-2xl z-10  lg:w-[650px] shadow-2xl border border-black overflow-y-auto p-12 text-xl text-left">
     
     
      <div className="my-4">
        <label htmlFor="Name"> Name: </label><br />
          <input type="text" placeholder="Enter your Name" {...register('name')}  className="p-3 w-full border border-black " />
      
      </div>
      < div className="my-4">
        <label htmlFor="Phone Number">Phone Number:</label><br />
        <input type="number" placeholder="Enter Your Phone number" {...register('phone')} className="p-3 w-full  border-black border b"/>
      </div>
      <div className="my-4">
        <label htmlFor="Email"> Email:</label><br />
          <input type="email" placeholder="Enter your email"  {...register('email')} className="p-3 w-full  border-black border"/>
       
      </div>
      <div className="my-4">
        <label htmlFor="Address">Address:</label><br />
        <input type="text" placeholder="Enter Your Address" {...register('address')} className="p-3 w-full border border-black" />
      </div>
      <div className="my-4">
      <p>CLick buy to place your order</p>
      <button type="submit" className="bg-red-700 text-white p-3 rounded-lg">Place your order</button>
      </div>
    </form>
    </div>
  
  );
}

export  {BuyNow};
