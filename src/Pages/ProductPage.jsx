import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { useState } from "react";
import Product from "../Components/Product/Product";
import { Link, NavLink } from "react-router-dom";
import Cart from "../Components/Cart";
import SearchIcon from "@mui/icons-material/Search";
import Variants from "../Components/TestSkeletton";
import { collection, getDocs } from "firebase/firestore";
import { fireDb } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterForSm from "../Components/FilterForSm";
import { useForm } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ProductPage() {
  const select = useSelector((state) => state.cart.items);
  const colors = [
    { bg: "red-600", color: "red" },
    { bg: "green-600", color: "green" },
    { bg: "blue-600", color: "blue" },
    { bg: "black", color: "black" },
    { bg: "white", color: "white" },
    { bg: "orange-600", color: "orange" },
  ];

  const size = ["Large", "Small", "Medium", "XX-Large", "4-XL", "X-small"];

  const { register, handleSubmit, setValue } = useForm();

  const [priceRange, setPriceRange] = useState(0);
  const [btnClicked, setbtnClicked] = useState(false);
  const [selectedCatagory, setSelectedCatogery] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [isloading, setIsloading] = useState(true);
  const [firebaseProducts, setFirebaseProducts] = useState([]);
  const [localItem, setlocalItems] = useState(
    JSON.parse(localStorage.getItem("cartItems"))
  );
  const getLoc = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [isFilterActiveForSm, setISFilterActiveForSm] = useState(false);
  const [isFilterActiveForLg, setISFilterActiveForlg] = useState(false);

  const [searchItems, setSearchItems] = useState([]);
  const [isColorClicked, setIsColorClicked] = useState(null);
  const [sizeClicked, setSizeClicked] = useState(null);

  const[blur,setBlur]=useState("")

  // key enter
  const handleKeySearch = (event) => {
    if (event.key === "Enter") {
      const search = firebaseProducts.filter((item) => {
        return (
          item.name.toLocaleLowerCase().includes(searchValue) ||
          item.description.toLocaleLowerCase().includes(searchValue) ||
          item.description.toLocaleLowerCase().includes(searchValue)
        );
      });
      setSearchItems(search);
      console.log(search);
    }
  };
 
  


  //search Click//
  const handleSearchClick = () => {
    const regex = new RegExp(searchValue.toLowerCase(), 'g');
    const search = firebaseProducts.filter((item) => {
      return (
        item.name.toLocaleLowerCase().match(regex) ||
        item.description.toLocaleLowerCase().match(regex) ||
        item.description.toLocaleLowerCase().match(regex)
      );
    });
    setSearchItems(search);
    console.log(search);
  };

  const handelCategoryClick = (catagory) => {
    const categoryItem = firebaseProducts.filter((item) => {
      item.name.toLocaleLowerCase().includes(catagory) ||
        item.description.toLocaleLowerCase().includes(catagory) ||
        item.description.toLocaleLowerCase().includes(catagory);
    });
    setSearchItems(categoryItem);
  };

  //filter for sm
  const handelFilterForSm = () => {
    setISFilterActiveForSm(true);

    document.body.style.overflow = "hidden";
  };
  const handlePriceRangeChange = (e) => {
    const price = e.target.value;
    setPriceRange(price);
  };

  //Closing the Modal for sm
  const handleClose = () => {
    setISFilterActiveForSm(false);
    document.body.style.overflow = "auto";
  };

  //handeling the Color Click
  const handleColorClick = (color) => {
    if (isColorClicked === color) {
      setIsColorClicked(null);
    } else {
      setIsColorClicked(color);
      setValue("selectedColor", color);
    }
  };

  const handleSizeClick = (size) => {
    if (sizeClicked === size) {
      setSizeClicked(null);
    } else {
      setSizeClicked(size);
      setValue("selectedSize", size);
    }
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

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("cartItems"));
    console.log(item);
    console.log(select);
    setlocalItems(item);
  }, [select]);

  const getDataFromFireBase = useCallback(async () => {
    const valRef = collection(fireDb, "product");
    const data = await getDocs(valRef);
    const alldata = data.docs.map((val) => ({ ...val.data(), id: val.id }));
    setFirebaseProducts(alldata);
    setIsloading(false);
    console.log(alldata);
    console.log(data);
  }, []);

  useEffect(() => {
    getDataFromFireBase();
  }, [getDataFromFireBase]);

  const handelApplyFilter = (data, e) => {
    e.preventDefault();
    console.log(data);
    const pricetoFilter =
      data.priceRange < 50 ? priceRange * 50 : priceRange * 200;
    console.log(pricetoFilter);
    const filteredItems = firebaseProducts.filter((item) => {
      return (
        item.price < pricetoFilter &&
        (item.description
          .toLowerCase()
          .includes(data.selectedColor?.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(data.selectedSize?.toLowerCase()) ||
          item.name.toLowerCase().includes(data.selectedColor?.toLowerCase()) ||
          item.name.toLowerCase().includes(data.selectedSize?.toLowerCase()))
      );
    });
    console.log(filteredItems);
    setSearchItems(filteredItems);
  };

  const renderProducts = () => {
    const renderedProducts = [];

    for (let i = 0; i < firebaseProducts.length; i++) {
      let found = false;

      for (let j = 0; j < searchItems.length; j++) {
        if (firebaseProducts[i].id === searchItems[j].id) {
          found = true;
        }
      }

      if (!found) {
        renderedProducts.push(
          <Product
            key={firebaseProducts[i].id}
            src={firebaseProducts[i].image}
            title={firebaseProducts[i].name}
            description={firebaseProducts[i].description}
            price={firebaseProducts[i].price}
            id={firebaseProducts[i].id}
          />
        );
      }
    }

    return renderedProducts;
  };

  if (!isloading) {
    return (
      <div className=" p-1 ">
        <div className="   lg:flex justify-center lg:gap-10 hidden  bg-slate-100 sticky top-24  z-40  w-full py-5">
          <input
            className="text-black border-black border-t border-l border-b lg:w-[600px] bg-[#f0f0f0] rounded-2xl lg:px-6 "
            placeholder="Search for products...."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeySearch}
          />

          <div className="bg-slate-300  lg:ml-[-60px] lg:p-1 lg:mx-10 border-y border-r rounded-r-xl  border-black  ">
            <SearchIcon fontSize="large" onClick={handleSearchClick}  />
          </div>
          <Link to="/cart">
            <Cart ItemsNoInCart={localItem?.length || 0} />
          </Link>

          <div className="text-[#9e9e9e]">
            Total products available: {firebaseProducts.length}
          </div>
          <div onClick={() => {setISFilterActiveForlg(true) 
            setBlur("blur-sm")
            document.body.style.overflow="hidden"
          }}>
            <FilterListIcon fontSize="large" />
            Filters
            <KeyboardArrowDownIcon />
          </div>
        </div>

        {/* for mobile */}
        <div className="lg:hidden my-4 mx-4">
          <div className=" flex items-center justify-center   ">
            <input
              className="text border h-14   border-black text-lg w-full   p-2"
              placeholder="Search for products...."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <div className="bg-slate- p-1 h-14 border-y border-r flex items-center  border-black ">
              <SearchIcon
                onClick={handleSearchClick}
                fontSize="large"
                className=""
              />
            </div>

            <Link to="/cart" className="bg-slate-50 ">
              {" "}
              <Cart ItemsNoInCart={select.length} className="" />
            </Link>

            <FilterListIcon
              onClick={handelFilterForSm}
              className=" font-bold  "
              fontSize="large"
            />
          </div>
        </div>

        {isFilterActiveForSm ? (
          <FilterForSm
            onCLose={handleClose}
            setbtnClicked={setbtnClicked}
            handleClick={handleClick}
            firebaseProducts={firebaseProducts}
            searchItems={searchItems}
            setSearchItems={setSearchItems}
          />
        ) : null}

        {isFilterActiveForLg ? (
             <motion.div
             key="11"
             className="shadow-2xl shadow-black z-50 absolute  bg-slate-200  p-10 px-28  w-full"
             exit={{ opacity: 0, y: -100 }}
             initial={{ opacity: 0, y: -100 }}
             animate={{ opacity: 1, y: 0 }}
             
             transition={{ duration: 0.4 }}
            
           >
            <form
                className="  flex justify-center items-center"
                onSubmit={handleSubmit(handelApplyFilter)}
              >
          <div className={`  `}>
            <div className=" flex gap-10 ">
              <div className="text-left  flex flex-col text-lg   ">
                <label className="text-left font-bold text-2xl">
                  Select Catogory:
                </label>

                <hr className="lg:mt-5 mt-2" />

                <button
                  className="text-left lg:m-2 m-1 hover:underline"
                  onClick={() => {
                    setSearchItems(null);
                  }}
                >
                  All
                </button>

                {catagory.map((cato) => (
                  <button
                    className="text-left  m-1 hover:underline"
                    key={cato.title}
                    onClick={() =>
                      handelCategoryClick(cato.title.toLocaleLowerCase())
                    }
                  >
                    {cato.title}
                  </button>
                ))}
              </div>

              
                
                {/* color section */}
                <div className="text-2xl font-bold    flex flex-col ">
                  <h1> Colors</h1>

                  <div className="grid grid-cols-3  mt-2">
                    {colors.map((color) => (
                      <div
                        key={color.bg}
                        className={`rounded-[50%] w-12 h-12 mx-4 my-3 bg-${color.bg} border border-gray-500`}
                        onClick={() => handleColorClick(color.color)}
                      >
                        <div>
                          {isColorClicked === color.color && (
                            <CheckIcon
                              fontSize="large"
                              className="text-amber-200"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className=" font-bold text-2xl my-4  ">
                  Size
                  <div className="grid grid-cols-3  mt-4">
                    {size.map((size) => (
                      <button
                        type="button"
                        key={size}
                        className={`bg-slate-100 rounded-2xl px-10 mx-3 my-4 font-normal text-sm ${
                          sizeClicked === size ? "bg-slate-400" : null
                        }  py-2 `}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid">
                 <h1 className="text-2xl font-bold">Price</h1>
                     <input
                       style={{
                         transform: 'rotate(-90deg)', 
                         transformOrigin: 'bottom', 
                          
                       }}
                       type="range"
                       minLength={0}
                       maxLength={100}
                       value={priceRange}
                       {...register("PriceRange")}
                       onChange={handlePriceRangeChange}
                       className="mt-20 "
                     />
                          <h1 className="font-bold text-xl  px-4  mt-24">
                       {" "}
                       Rs.0 - Rs.
                       {priceRange < 50
                         ? priceRange * 50
                         : priceRange * 200}{" "}
                     </h1>
                 </div>
             
            </div>
            <div className="flex justify-center gap-10 mt-4">
              <button
                type="submit"
                onClick={() =>
                  toast.success("Filter applied", {
                    position: "top-right",
                  })
                }
                className="bg-red-500 hover:bg-red-600 text-lg  text-white w-48  p-2"
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={() => {setISFilterActiveForlg(false)   
                  setBlur('')
                  document.body.style.overflow="auto"
                  }
                
                }
                className="bg-black text-white p-2 w-48 hover:bg-purple-950 "
              >
                Close
              </button>
            </div>
            
          </div>
        
          </form>
          </motion.div>
        ) : null}
        <div className= {`grid lg:grid-cols-4 gap-2 md:grid-cols-3 grid-cols-2 ${blur}`}>
          {searchItems?.map((item) => (
            <Product
              key={item.id}
              src={item.image}
              title={item.name}
              discription={item.description}
              price={item.price}
              id={item.id}
            />
          ))}
          {renderProducts()}
        </div>

        {/* <ToastDestructive/> */}
      </div>
    );
  } else if (isloading) {
    return (
      <div className="">
        <div className="lg:my-7 lg:ml-10 lg:flex justify-center lg:gap-10  hidden">
          <input
            className="text border-black border-t border-l border-b lg:w-[600px] bg-[#f0f0f0] rounded-2xl lg:px-6 "
            placeholder="Search for products...."
            value={searchValue}
            onChange={() => {
              setSearchValue(e.target.value);
            }}
          ></input>
          <div className="bg-slate-300  lg:ml-[-60px] lg:p-1 lg:mx-10 border-y border-r rounded-r-xl  border-black  ">
            <SearchIcon fontSize="large" />
          </div>

          <span className="lg:mx-10 lg:text-lg text-sm hidden">
            Total Items: {firebaseProducts.length}
          </span>
          <Link to="/cart">
            <Cart ItemsNoInCart={localItem?.length || 0} />
          </Link>
        </div>
        <div className="grid grid-cols-[1.5fr,6fr]  shadow-blue-500 ">
          <div className=" overflow-scroll ml-auto p-9  h-fit lg:block hidden border-[#efefef] border-2 rounded-2xl">
            <div className="text-left  flex flex-col text-lg  ">
              <label className="text-left font-bold text-xl">
                Select Catogory:
              </label>

              <hr className="mt-5" />

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
                  onClick={() => handleClick(cato.title.toLocaleLowerCase())}
                >
                  {cato.title}
                </button>
              ))}
            </div>
            <hr className="" />
            <div className="my-8">
              <div className="text-left text-2xl font-bold">Price</div>
              <input type="range" maxLength={40} />
            </div>

            <hr className="mt-4" />
            {/* color section */}
            <div className="text-2xl font-bold text-left mt-4">
              Colors
              <div className="grid grid-cols-3  gap-4 my-5">
                {colors.map((color) => (
                  <div
                    key={color.bg}
                    className={`rounded-[50%] w-10 h-10 bg-${color.bg} border border-gray-500`}
                  ></div>
                ))}
              </div>
            </div>

            <hr />
            <div className="text-left font-bold text-2xl my-4">
              Size
              <div className="grid grid-cols-2 gap-5 mt-4">
                {size.map((size) => (
                  <button
                    key={size}
                    className="bg-slate-100 rounded-2xl font-normal text-sm  py-2"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Variants
            width={300}
            gridcols={"lg:grid-cols-3  ml-16 "}
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default ProductPage;
