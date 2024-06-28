import React, { useEffect, useState } from "react";
import Card from "./Card";
import Graph from "./Graph";
import Table from "./Table";
import BookIcon from "@mui/icons-material/Book";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { fireDb } from "../../../Firebase/Firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup,logOut} from "../../Features/Authentication/Auth";





function Dashboard() {

  const dispatch=useDispatch();
const navigate=useNavigate()


  const handleLogout=()=>{
    localStorage.setItem('isAdmin',JSON.stringify(false));
    dispatch(logOut())
    localStorage.setItem('loginStatus',JSON.stringify(false));
    navigate('')
  }
  const [users, setUsers] = useState([]);
  const [noOfOrders, setNumberOfOrders] = useState();
  const [addedproducts, setAddedProducts] = useState([]);

  const getaddedProducts = async () => {
    const valRef = collection(fireDb, "product");
    const data = await getDocs(valRef);
    const alldata = data.docs.map((val) => ({ ...val.data(), id: val.id }));
    setAddedProducts(alldata);
  };
  useEffect(() => {
    getaddedProducts();
  }, []);

  useEffect(() => {
    const getDataFromFireBase = async () => {
      const valRef = collection(fireDb, "Orders");
      const data = await getDocs(valRef);
      const alldata = data.docs.map((val) => ({ ...val.data(), id: val.id }));
      setNumberOfOrders(alldata.length);
    };
    getDataFromFireBase();
  }, []);

  const getNoofUsersFromFireBase = async () => {
    const valRef = collection(fireDb, "user");
    const data = await getDocs(valRef);
    const alldata = data.docs.map((val) => ({ ...val.data(), id: val.id }));
    setUsers(alldata);
    console.log(alldata);
    console.log(data);
  };
  useEffect(() => {
    getNoofUsersFromFireBase();
  }, []);

  return (
    <div>
      <div className=" flex p-5 items-center font-semibold text-xl justify-between bg-slate-100 m-4 ">
        Dashboard
        {/* <AdminPanelSettingsIcon fontSize="large" className="font-semibold"/> */}
        <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-1 rounded-lg hover:bg-red-700">Logout</button>
      </div>
      <div className="grid grid-cols-3 mx-4 gap-8 font-bold">
        <div className="bg-blue-300 ml-2 border   rounded-2xl text-4xl flex items-center">
          <div className="m-auto">
            <h1 className="text-yellow-300 font-bold">Users</h1>
            <p className=""> {users?.length}</p>
          </div>
        </div>

        <div className="bg-red-200 rounded-2xl text-4xl flex items-center border">
          <div className="m-auto">
            <h1 className="text-blue-900 font-bold">Total Sales</h1>
            <p className="">$5000</p>
          </div>
        </div>

        <div className="bg-blue-400 p-4  rounded-2xl text-4xl  flex items-center border">
          <div className="m-auto">
            <h1 className="text-yellow-300 font-bold">Total Added Items</h1>
            <p>{addedproducts.length}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2fr,0.8fr] mx-3 mt-10">
        <img
          src="https://pnp.github.io/sp-dev-fx-controls-react/assets/BarChart.png"
          alt="graph"
          className=" w-full"
        />
        <div className=" p-4 ">
          <div className=" h-fit border-2  mt-12 border-yellow-300 bg-slate-100 text-left text-xl p-6 py-12">
            <h1 className="font-dark text-3xl"> Sales Review </h1>
            <hr />
            <div className="my-4 flex ">
              <h1 className=" p-3 ">Total Orders</h1>
              <div className="flex items-center ">
                <BookIcon fontSize="large" className="text-blue-800" />:
                <span className="font-bold text-4xl  p-1 text-red-80">
                  {noOfOrders}
                </span>
              </div>
            </div>
            <div className="my-4 flex ">
              <h1 className=" p-3">
                <div className='flex items-center gap-2'>
                Shipped Orders{" "} 
                 <LocalShippingIcon fontSize="large" className="text-red-700 " />
                : <span></span>
                </div>
              </h1>
            </div>
            <div className="my-4">
              <h1 className=" p-3">
                Cancelled Orders{" "}
                <CancelIcon fontSize="large" className="text-yellow-600" />:{" "}
              </h1>
            </div>
          </div>
          <Link to="/admin/addnewItem">
            <button className="text-2xl my-4 p-2 bg-red-600 hover:bg-blue-800 w-full text-white rounded-lg">
              Add a New Item
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
