import React, { useEffect, useState } from "react";
import AddCard from "./AddCard";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import axios from "axios";
import ViewAdminProduct from "./ViewAdminProduct";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { listAll, ref } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { imageDb, fireDb } from "../../../Firebase/Firebase";
function AddNewItem() {
  const [btnClk, setBtnClk] = useState(false);

  //for view Item
  const [isBlur, setIsBlur] = useState(false);

  //items to map in table
  const [items, setItems] = useState([]);
  const [viewItem, setViewItem] = useState();
  const count = 0;

  const [isloading, setIsloading] = useState(false);
  const [getAllProducts, setGetAllProducts] = useState([]);

  const onClose = () => {
    setBtnClk(false);
  };
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setItems(response.data);
    });
  }, []);

  //get data from firebase
  const getDataFromFireBase = async () => {
    const valRef = collection(fireDb, "product");
    const data = await getDocs(valRef);
    const alldata = data.docs.map((val) => ({ ...val.data(), id: val.id }));
    setGetAllProducts(alldata);
    console.log(alldata);
    console.log(data);
  };
  // view Single Product
  const onClickEye = (id) => {
    try {
      const fetchdata = async () => {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setViewItem(response.data);
        setIsBlur(true);

        console.log(response.data);
      };
      fetchdata();
    } catch (error) {
      throw error;
    }
  };

  //close button on the Single product view
  const onSingleViewClose = () => {
    setIsBlur(false);
  };

  useEffect(() => {
    getDataFromFireBase();
  }, [btnClk]);

  //

  useEffect(() => {
    if (btnClk) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [btnClk]);

  const handleClick = () => {
    setBtnClk(true);
  };

  return(
    <div>
      {btnClk ? (
        <AddCard position="fixed top-1  left-[35vw]" onClose={onClose} />
      ) : (
        ""
      )}

      <div>
        <div className="flex justify-between items-center p-2 bg-slate-50 mb-3">
          <span className=" from-neutral-700 border text-4xl  p-3 text-left  ">
            {" "}
            Recently Added Items{" "}
          </span>

          <span>
            <span className="m-10">
              <Link to="/admin">
                <HomeIcon
                  fontSize="large"
                  className="text-gray-700 hover:text-blue-700"
                />
              </Link>
            </span>
            <button
              className="bg-blue-600 text-white p-3 rounded-lg m-4 "
              onClick={handleClick}
            >
              Add new Item
            </button>
          </span>
        </div>

        {/* Recently added Items */}
        <div
          className={` grid lg:grid-cols-5  justify-start  border gap-10 bg-blue-50 p-5 ${
            btnClk || isBlur ? "blur-[2px] opacity-80" : ""
          }`}
        >
          {getAllProducts.slice(0, 5).map((item) => (
            <div key={item.id} className=" shadow-lg p-4 bg-white rounded-lg ">
              <div>
                <img src={item.image} alt="" className=" h-60 w-60 p-4" />
              </div>
              <h1>{item.name}</h1>
            </div>
          ))}
        </div>

        <div
          className={`flex items-center gap-20 text-lg mt-4 bg-slate-100 p-4 ${
            btnClk || isBlur ? "blur-[2px]" : ""
          }`}
        >
          <div className="flex text-5xl m-4 from-neutral-700">
            <span>All Products |</span>
          </div>
          <span className="font-semibold p-2">
            Total Products:({items.length + getAllProducts.length})
          </span>
          <div>
            Search By:
            <select>
              <option value="Recently Added">Recently Added</option>
              <option value="" selected>
                Default
              </option>
            </select>
          </div>
        </div>

        {/* table  */}
        <table
          className={`w-full bg-blue-50 mt-2  ${
            btnClk || isBlur ? "blur-[2px]" : ""
          }`}
        >
          <thead className="border w-full bg-slate-100 ">
            <tr>
              <th className=" p-3 border-slate-800 border">S.N</th>
              <th className=" p-3 border-slate-800 border">Items</th>
              <th className=" p-3 border-slate-800 border">Name</th>
              <th className=" p-3 border-slate-800 border">Price</th>
              <th className=" p-3 border-slate-800 border">Category</th>
              <th className=" p-3 border-slate-800 border">View Item</th>
            </tr>
          </thead>
          <tbody className="border">
            {items.map((item) => (
              <tr className="border">
                <td className="border border-slate-800">{item.id}</td>
                <td className="border border-slate-800  ">
                  <div className="flex justify-center">
                    <img src={item.image} className="h-28 w-28 " alt="" />
                  </div>
                </td>
                <td className="border border-slate-800 max-w-40">
                  {" "}
                  {item.title}
                </td>
                <td className="border border-slate-800"> {item.price}</td>
                <td className="border border-slate-800">{item.category}</td>
                <td className="border border-slate-800">
                  <RemoveRedEyeIcon
                    onClick={() => {
                      onClickEye(item.id);
                    }}
                    fontSize="medium"
                    className="hover:text-blue-600"
                  />
                </td>
              </tr>
            ))}
            {getAllProducts.map((item, index) => (
              <tr>
                <td className="border border-slate-800">
                  {items.length + index + 1}
                </td>
                <td className="border border-slate-800">
                  <div className="flex justify-center">
                    <img src={item.image} className="w-28- h-28" alt="" />
                  </div>
                </td>
                <td className="border border-slate-800"> {item.name}</td>
                <td className="border border-slate-800">{item.price}</td>
                <td className="border border-slate-800">{item.category}</td>
                <td className="border border-slate-800">
                  <RemoveRedEyeIcon className="hover:text-blue-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* popup */}
        {isBlur && (
          <ViewAdminProduct
            onClose={onSingleViewClose}
            price={viewItem?.price}
            image={viewItem?.image}
            category={viewItem?.category}
            title={viewItem?.title}
            description={viewItem?.description}
          />
        )}
      </div>
    </div>
  );
}

export default AddNewItem;
