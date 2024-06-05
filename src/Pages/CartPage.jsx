import React, { useEffect, useState } from "react";
import Product from "../Components/Product/Product";
import axios from "axios";
import { Link } from "react-router-dom";
import Variants from "../Components/TestSkeletton";
import DeleteIcon from '@mui/icons-material/Delete';


function CartPage() {
  const URL = "https://fakestoreapi.com/products";
  const [items, setItems] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [price,setPrice]=useState(0);
  const [Id, setId] = useState();

  //
  const handleClick = (id) => {
    const localstorageItems = JSON.parse(localStorage.getItem("cartItems"));
    const filteredItems = localstorageItems.filter((itemId) => itemId !== id);
    localStorage.setItem("cartItems", JSON.stringify(filteredItems));
    setId(localstorageItems);

    console.log(localstorageItems);
  };

  useEffect(() => {

    const getItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (getItems.length === 0) {
      setIsloading(false);
    }
    if (getItems.length > 0) {
      const fetchProducts = async () => {
        try {
          const responses = await Promise.all(
            getItems.map((id) =>
              axios.get(`https://fakestoreapi.com/products/${id}`)
            )
          );
          const products = responses.map((response) => response.data);
          setItems(products);
          setIsloading(false);

          // console.log(products);
        } catch (error) {
          console.error("Error fetching products", error);
        }
      };

      fetchProducts();
      {(items.map((item)=>{
        const price =item.price;
        const sum=price+item.price
        setPrice(sum)
      }))}

    }
  }, [handleClick, items]);
  if (items.length > 0) {
    return (<>

    {items.map((itm)=>(
      <div key={itm.title} className="flex flex-col lg:flex-row justify-between lg:m-6 mt-2 shadow-lg items-center border hover:translate-x-3 bg-slate-200  lg:text-lg font-bold lg:px-6">
        <div className="bg-slate-200">
          <Link  to={`/products/${itm.id}`}>
        <img src={itm.image} alt="" className="lg:h-40 lg:w-40 p-5 h-32 w-32"/>
        </Link>
        </div>
        <div className="lg:max-w-40 text-fuchsia-800 ">
          Name:{itm.title}
        </div>
        <div className="text-red-500">
          Price:${itm.price}
        </div>
        <div className="text-blue-800">
        Quantity:1
        </div>
        <div className="w-full lg:w-fit bg-orange-300 hover:bg-orange-400 lg:bg-slate-200"  >
        <DeleteIcon  onClick={()=>{handleClick(itm.id)}}/>

        </div>

      </div>

    ))}
    <button className="bg-blue-400 w-full mt-2 lg:w-[30%] hover:bg-blue-500 p-3 rounded-lg text-white">Buy Now</button>



    
    </>

      // <div className="mt-4 grid">
      // <table>
      //   <thead className="p-6">
      //     <tr className="p-6 shadoe-lg">
      //       <th className="p-6  ">Items</th>
      //       <th className="p-6 ">Name</th>
      //       <th className="p-6 ">Pr6ce</th>
      //       <th className="p-6 ">Quantity</th>
      //     </tr>
      //   </thead>
      //   <tbody className="">
      //     {items.map((item) => (
      //       <tr className=" bg-slate-200 gap-3  border-white border-t-2 ">
      //         <td className="border-t-2 border-white p-8">
      //           <div>
      //             <img
      //               src={item.image}
      //               alt="item"
      //               className="h-20 bg-blend-multiply"
      //             />
      //           </div>
      //         </td>
      //         <td className=" ">{item.title}</td>
      //         <td className=" ">
      //           <h1>${item.price}</h1>
      //         </td>
      //         <td className="">1</td>
      //       </tr>
      //     ))}
      //   </tbody>
      // </table>
  
      // </div>
    );
  } else if (isloading === false) {
    return (
      <>
        <div
          className=" bg-white bg-blend-hard-light"
          style={{
            backgroundImage: `url('https://img.freepik.com/free-vector/hand-drawn-shrug-illustration_23-2149318018.jpg?t=st=1716284361~exp=1716287961~hmac=18c45b5a1dca9239a96e21f6640a23951ddc8bc1e5c33d5103c021fd4a7a5284&w=1380')`,
            backgroundSize: "contain",
            height: "78vh",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className=" font-bold text-6xl text-red-800  lg:p-16">
            No items In the cart
          </div>
        </div>
        <Link to="/products">
          <button className="bg-red-800 text-white rounded p-4">
            Continue Shoping...
          </button>
        </Link>
      </>
    );
  } else if (isloading) {
    return <Variants width={620} gridcols={"grid-cols-2"} />;
  }
}


export default CartPage;
