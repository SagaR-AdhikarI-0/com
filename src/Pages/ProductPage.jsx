import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Product from "../Components/Product/Product";
import { Link, NavLink } from "react-router-dom";
import Cart from "../Components/Cart";
import SearchIcon from "@mui/icons-material/Search";
import Variants from "../Components/TestSkeletton";
import { collection,getDocs
 } from "firebase/firestore";
 import { fireDb } from "../../Firebase/Firebase";
function ProductPage() {
  const [items, setItems] = useState([]);
  const [btnClicked, setbtnClicked] = useState(false);
  const [selectedCatagory, setSelectedCatogery] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [isloading, setIsloading] = useState(true);
  const [firebaseProducts, setFirebaseProducts] = useState([]);
  const [localItem, setlocalItems] = useState([]);
  const getLoc = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [searchItems, setSearchItems] = useState([]);
  //key enter
  const handleKeySearch = (event) => {
    if (event.key === "Enter") {
      const search = items.filter((item) =>
        item.category.includes(searchValue)
      );
      const search1 = items.filter((itm) =>
        itm.description.includes(searchValue)
      );
      setSearchItems(search);
      if (search1.length > 0) {
        setSearchItems(...searchItems, search1);
        console.log(searchItems);
      }
      setSearchValue("");
      console.log(searchValue);
      console.log(searchItems);
      setbtnClicked(null);
    }
  };
  // //search Click//
  const handleSearchClick = () => {
  
    const search = items.filter((item) => item.category.includes(searchValue));
    const search1 = items.filter((itm) =>
      itm.description.includes(searchValue)
    );
    setSearchItems(search);
    if(firebaseProducts.length>0)
      {
        const search3=firebaseProducts.filter((item)=>{item.category.includes(searchValue)||item.description.includes(searchValue)})
        setSearchItems(...searchItems,search3)
      }
    if (search1.length > 0) {
      setSearchItems(...searchItems, search1);
      console.log(searchItems);
    }
    setSearchValue("");
    console.log(searchValue);
    console.log(searchItems);
    setbtnClicked(null);
  };

  const handleClick = (category) => {
    setSelectedCatogery(category);
    setbtnClicked(true);
    console.log(selectedCatagory);
    searchItems();
  };

  const catagory = [
    { title: "Electronics" },
    { title: "Jewelery" },
    { title: "Men's clothing" },
    { title: "Women's clothing" },
  ];

  const URL = "https://fakestoreapi.com/products";
  useEffect(() => {
    if (btnClicked === false) {
      try {
        axios
          .get(URL)
          .then((response) => {
            setItems(response.data);
            setlocalItems(getLoc);
          })
          .then(() => {
            setIsloading(false);
          });
      } catch (error) {
        throw error;
      }
    } else {
      try {
        axios
          .get(`https://fakestoreapi.com/products/category/${selectedCatagory}`)
          .then((response) => {
            setItems(response.data);
            setlocalItems(getLoc);
            setIsloading(false);
          });
      } catch (error) {
        throw error;
      }

      //
    }
  }, [btnClicked, searchItems, selectedCatagory, localItem]);
  useEffect(() => {
    const getDataFromFireBase = async () => {
      const valRef = collection(fireDb, "product");
      const data = await getDocs(valRef);
      const alldata = data.docs.map((val) => ({ ...val.data(), id: val.id }));
      setFirebaseProducts(alldata);
      console.log(alldata);
      console.log(data);
    };
    getDataFromFireBase()
  }, []);

  if (!isloading) {
    return (
      <div>
        <div className="md:my-7 px-4  my-3 lg:ml-10 flex lg:justify-center lg:gap-10">
          <input
            className="  border-black border-t border-l border-b lg:w-80 lg:px-6 "
            placeholder="Search Items"
            value={searchValue}
            onKeyPress={handleKeySearch}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <div className="bg-slate-200  lg:ml-[-45px] lg:p-1 lg:mx-10 border border-black  ">
            <SearchIcon onClick={handleSearchClick} fontSize="large" />
          </div>

          <p className="mx-10 text-sm flex-wrap w-full  hidden md:text-lg">
            Total Items:{" "}
            {searchItems.length > 0 ? searchItems.length : items.length}
          </p>
          <Link to="/cart">
            <Cart ItemsNoInCart={localItem.length} />
          </Link>
        </div>
        <div className="grid lg:grid-cols-[1.5fr,6fr]  shadow-blue-500 ">
          <div className=" border-blue-600 drop-shadow-sm">
            <div className="lg:grid  min-w-52   h-full  z-40">
              <div className="mt-8">
                <div className=" text-left px-14 py-4 hidden lg:flex lg:flex-col flex-wrap text-lg">
                  <label className="text-left font-bold text-xl">
                    Select Catogory:
                  </label>

                  <button
                    className="text-left m-2 hover:underline"
                    onClick={() => {
                      setbtnClicked(false);
                    }}
                  >
                    All
                  </button>

                  {catagory.map((cato) => (
                    <button
                      className="text-left m-2 hover:underline"
                      key={cato.title}
                      onClick={() =>
                        handleClick(cato.title.toLocaleLowerCase())
                      }
                    >
                      {cato.title}
                    </button>
                  ))}
                </div>
                <div className="lg:hidden ">
                  <label htmlFor="catagory" className="">
                    Select Catagory:
                  </label>
                  <select
                    name="caatagory"
                    id=""
                    className="p-1 bg-none bg-blue-200 rounded ml-2"
                  >
                    <option
                      value="All"
                      onClick={() => {
                        setbtnClicked(false);
                      }}
                    >
                      {" "}
                      All
                    </option>
                    {catagory.map((cato) => (
                      <option
                        className="text-left"
                        key={cato.title}
                        onClick={() =>
                          handleClick(cato.title.toLocaleLowerCase())
                        }
                      >
                        {cato.title}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="pt-5 flex flex-col">
                  <h1 className="text-lg font-bold text-left mx-14">Search By order</h1>
                  
                  <button className="  mx-16 text-left mt-3">
                  Accending (A-Z)
                  </button>
                  <button className="  mx-16 text-left mt-3">
                  Z-A
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3">
            
              

            {!searchItems.length > 0
              ? items.map((a) => (
                  <Product
                    key={a.id}
                    src={a.image}
                    discription={a.discription}
                    title={a.title}
                    price={a.price}
                    id={a.id}
                  />
                ))
              : searchItems.map((a) => (
                  <Product
                    key={a.id}
                    src={a.image}
                    discription={a.discription}
                    title={a.title}
                    price={a.price}
                    id={a.id}
                  />
                ))}
                {firebaseProducts?.map((item) => (
                <Product key={item.description}
                src={item.image}
                title={item.name}
                discription={item.description}
                price={item.price}
                id={item.id}
                
                />
              ))}
            
          </div>
        </div>
        {/* <ToastDestructive/> */}
      </div>
    );
  } else if (isloading === true) {
    return (
      <div>
        <div className="lg:my-7  lg:ml-10 lg:flex justify-center lg:gap-10">
          <input
            className="text border-black border-t border-l border-b lg:w-80 lg:px-6 "
            placeholder="Search Items"
            value={searchValue}
            onChange={() => {
              setSearchValue(e.target.value);
            }}
          ></input>
          <div className="bg-slate-200  lg:ml-[-45px] lg:p-1 lg:mx-10 border border-black  ">
            <SearchIcon onClick={handleSearchClick} fontSize="large" />
          </div>

          <span className="lg:mx-10 lg:text-lg text-sm hidden">
            Total Items: {items.length}
          </span>
          <Link to="/cart">
            <Cart ItemsNoInCart={localItem.length} />
          </Link>
        </div>
        <div className="grid grid-cols-[1.5fr,6fr]  shadow-blue-500 ">
          <div className=" border-blue-600 drop-shadow-sm">
            <div className="grid  min-w-52   h-full  z-40">
              <div className="mt-8">
                <div className="text-left px-14 py-4 flex flex-col text-lg">
                  <label className="text-left font-bold text-xl">
                    Select Catogory:
                  </label>

                  <button
                    className="text-left m-2 hover:underline"
                    onClick={() => {
                      setbtnClicked(false);
                    }}
                  >
                    All
                  </button>

                  {catagory.map((cato) => (
                    <button
                      className="text-left m-2 hover:underline"
                      key={cato.title}
                      onClick={() =>
                        handleClick(cato.title.toLocaleLowerCase())
                      }
                    >
                      {cato.title}
                    </button>
                  ))}
                </div>
                {/* <div className="pt-5 flex flex-col">
                  <h1 className="text-lg font-bold text-left mx-14">Search By order</h1>
                  
                  <button className="  mx-16 text-left mt-3">
                  Accending (A-Z)
                  </button>
                  <button className="  mx-16 text-left mt-3">
                  Z-A
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <Variants width={300} gridcols={"grid-cols-3"} height={350} />
        </div>
      </div>
    );
  }
}

export default ProductPage;
