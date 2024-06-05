import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "../Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function ViewProduct() {
  const [item, setItem] = useState();
  const [isDiaabled,setIsDisabled]=useState()
  const { id } = useParams();


  const handleAddToCart = (id) => {
    console.log(id)
    
    try {
      const existingCartItemsId = JSON.parse(
        localStorage.getItem("cartItems")
      
       
      );
     
      if (!existingCartItemsId.includes(id)) {
        const updatedCartItemsId = [...existingCartItemsId,Number(id)];
        localStorage.setItem("cartItems",JSON.stringify(updatedCartItemsId));
       console.log(existingCartItemsId)
      } else {
        alert("Item already added to the  cart");
      }
     
      console.log(updatedCartItemsId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setItem(response.data);
  
        console.log(response.data);
      };
      fetchdata();
    } catch (error) {
      throw(error)
      
    }
 
   
  }, []);
  console.log(item);

  return (
    <div className="grid lg:grid-cols-[1fr,2fr] lg:mx-40 m-2 font-bold mt-10 lg:my-20 lg:gap-36">
      <div className="flex justify-center" >
        <img src={item?.image}  alt={item?.title} className="h-60 w-52 lg:h-96 lg:w-full" />
      </div>
      <div className="text-left">
        <h1 className="lg:text-3xl text-lg  ">{item?.title}</h1>
        <div className="my-3">
          <StarRating />
        </div>
        <span>
          MRP:<span className=" line-through">${item?.price + 50}</span>
        </span>
        <div className="text-blue-600 font-bold text-xl lg:text-2xl">Deal of the Day:${item?.price}</div>
        <p className="my-3">{item?.description}.</p>

        <div className="flex justify-start lg:gap-20 my-4">
          <div>
            <LocalShippingIcon />
            <div>Free Delivery</div>
          </div>
          <div className="lg:flex lg:flex-col ">
            <div className="m-auto">
              {" "}
              <AccessTimeIcon />
            </div>

            <div className="flex">Delivery on time</div>
          </div>
          <div className="lg:flex lg:flex-col">
            <div className="m-auto">
              <VerifiedUserIcon />
            </div>

            <div>1 year warrenty</div>
          </div>
        </div>
        <hr></hr>
        <div className="my-3">
            <h1>Catagory: {item?.category}</h1>
        </div>
        <div className="mt-10 ">
        <button  onClick={()=>handleAddToCart(id)} isDiaabled className="bg-orange-400 p-3 rounded w-full text-blue-800 hover:bg-orange-600">Add to Cart</button>
        </div>
        
      
      </div>
     
    </div>
  );
}

export default ViewProduct;
