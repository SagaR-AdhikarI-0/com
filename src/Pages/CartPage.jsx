import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { Link } from "react-router-dom";
import Variants from "../Components/TestSkeletton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { BuyNow as BuyNowComp } from "../Components/BuyNow";
import { fireDb } from "../../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";

function CartPage() {
  const URL = "https://fakestoreapi.com/products";
  const [blur, setBlur] = useState(false);
  const [items, setItems] = useState([]);
  const [buyNowClicked, setIsBuyNowClicked] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [price, setPrice] = useState(0);
  const [Id, setId] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  //for checkbox for the selecting the item which to buy
  const [checked, setChecked] = useState(false);

  //close buy now function
  const CloseBuyNow = () => {
    setIsBuyNowClicked(false);
    setBlur(false);
    document.body.style.overflow='auto'
  };
  const handelBuyNowButtonClicked=()=>{
    setIsBuyNowClicked(true);
    setBlur(true);
    document.body.style.overflow='hidden'
  }

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) => {
      const index = prevSelectedItems.indexOf(id);
      if (index === -1) {
        return [...prevSelectedItems, id];
      } else {
        return prevSelectedItems.filter((itemId) => itemId !== id);
      }
    });
  };

  const handleClick = (id) => {
    const localstorageItems = JSON.parse(localStorage.getItem("cartItems"));
    const filteredItems = localstorageItems.filter((itemId) => itemId !== id);
    localStorage.setItem("cartItems", JSON.stringify(filteredItems));
    setId(localstorageItems);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    console.log(localstorageItems);
  };

  useEffect(() => {
    const getItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (getItems.length === 0) {
      setIsloading(false);
    }
    if (getItems.length > 0) {
      try {
        const getDataFromFireBase = async () => {
          const valRef = collection(fireDb, "product");
          const data = await getDocs(valRef);
          const alldata = data.docs.map((val) => ({
            ...val.data(),
            id: val.id,
          }));
          const filteredProducts = alldata.filter((all) =>
            getItems.includes(all.id)
          );
          console.log(filteredProducts);
          setItems(filteredProducts);
          console.log(alldata);
          console.log(data);
          setIsloading(false);
        };
        getDataFromFireBase();
      } catch (error) {
        console.error("Error fetching products", error);
      }
    }
  }, [blur]);

  let total= 0
  useEffect(() => {
  
    items.map((item) => {
     
       total= total + Number(item.price);
      setPrice(total);
      console.log(total);
      
    });
  }, [items.length])
  if (items.length > 0) {
    return (
      <div>
        <div className={` grid lg:m-7 ${blur ? "blur-sm" : null}`}>
          <div className=" hidden lg:block overflow-y-auto">
            <div className="  text-left mx-5 text-4xl font-bold mt-2 p-12">
              Product Details
              <div className="text-lg font-semibold mt-3 flex justify-between items-center">
                <h2> Selected:{selectedItems.length}</h2>{" "}
                <div className="font-semibold text-slate-700">
                  {" "}
                  Total ({items.length})
                </div>
              </div>
            </div>

            <table className="m-auto text-lg">
              <thead className="border shadow-md">
                <tr className="w-full font-semibold bg-red-200">
                  <td className="py-5 px-20">Select</td>
                  <td className="py-5 px-20">Items</td>
                  <td className="py-5 px-20">Name</td>
                  <td className="py-5 px-20">Price</td>
                  <td className="py-5 px-20">Quantity</td>
                  <td className="py-5 px-20">Delete</td>
                </tr>
              </thead>
              <tbody className="mt-4 bg-stone-100">
                {items.map((item) => (
                  <tr key={item.id} className="border shadow-md ">
                    <td>
                      {" "}
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td>
                      <Link to={`/products/${item.id}`}>
                        <img
                          src={item.image}
                          alt=""
                          className="lg:h-40 lg:w-40 p-5 h-28 w-32"
                        />
                      </Link>
                    </td>
                    <td className="max-w-60">{item.name}</td>
                    <td>Rs.{item.price}</td>
                    <td>
                      <input
                        type="number"
                        className="w-20  py-3 border border-black px-3 rounded-sm"
                        defaultValue={1}
                      />
                    </td>
                    <td>
                      <DeleteIcon
                        fontSize="medium"
                        className="hover:text-red-700 text-blue-700"
                        onClick={() => {
                          handleClick(item.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* for mobile */}
          <div className="block lg:hidden ">
            {items.map((item) => (
              <div className="flex  gap-4   p-2 border-y my-3" key={item.id}>
                <input type="checkbox" onChange={handleCheckboxChange}  />
                <div className="place-content-center">
                  <img src={item.image} alt="" className="h-full w-44 " />
                </div>
                <div className="grid w-full gap-2 text-start text-[#989797]">
                  <h1 className="text-lg text-black">
                    {item.name.length > 200
                      ? item.name.substring(0, 200)
                      : item.name}
                  </h1>

                  <p className="text-sm ">{item.description}</p>
                  <h1 className="text-sm ">Category:{item.category}</h1>
                  <div className="flex justify-between ">
                    <h1 className="text-red-600">Rs.{item.price}</h1>
                    <input
                      type="number"
                      className="w-20  border px-1"
                      defaultValue={1}
                    />
                  </div>
                </div>
                <CloseIcon    onClick={() => {
                          handleClick(item.id);
                        }} className="absolute  right-2  " fontSize="small"/>
              </div>
            ))}
        

          </div>

          {/* for small device's checkout button */}

          <div className="sticky bottom-32  lg:hidden">
            <div className=" bg-white py-4 ">
              <div className="mt-4 flex  justify-evenly items-center">
                <div className="">
                  {/* <span className="">Total: <h1 className="text-lg text-red-600">Rs.{price}</h1></span> */}
                  Total Items :({selectedItems.length})
                </div>
                
            
                <button
                  className="    bg-red-600 hover:bg-red-700 p-3 rounded-lg px-7 m-4  text-white text-lg"
                  onClick={handelBuyNowButtonClicked}
                >
                  Check out
                </button>
                

              </div>
            </div>
          </div>

          {/* for large devices checkout button */}

          <div className="lg:sticky hidden lg:block bottom-0 bg-white py-4">
            <div className="mt-4 lg:p-5 flex  lg:justify-end  lg:mx-20">
              <Link
                to="/products"
                className="flex px-10 text-xl text-blue-700 font-semibold hover:text-red-400 mt-4 items-center"
              >
                {" "}
                Continue Shopping{" "}
              </Link>
              <button
                className=" w-full mt-2 lg:w-[30%] bg-red-600 hover:bg-red-700 p-3  text-white text-lg"
                onClick={handelBuyNowButtonClicked}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {buyNowClicked && (
          <BuyNowComp setClose={CloseBuyNow} SendId={selectedItems} />
        )}
      </div>
    );
  } else if (isloading) {
    return (
      <div>
        <Variants width={2000} gridcols={"grid hidden lg:block "} height={200} />
        <Variants width={400} gridcols={'grid lg:hidden'} height={150}/>
      </div>
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
  }
}

export default CartPage;
