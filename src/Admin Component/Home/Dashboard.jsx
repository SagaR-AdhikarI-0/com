import React, { useEffect, useState } from "react";
import Card from "./Card";
import Graph from "./Graph";
import Table from "./Table";
import BookIcon from '@mui/icons-material/Book';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { fireDb } from "../../../Firebase/Firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from "react-router-dom";


function Dashboard() {
  const [users, setUsers] = useState([]);
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
      </div>
      <div className="grid grid-cols-3 gap-10">
      

        <div className="bg-blue-300 ml-3 border   rounded-2xl text-4xl flex items-center">
          <div className="m-auto">
            <h1 className="text-yellow-300">Users</h1>
            <p className=""> {users?.length}</p>
          </div>
        </div>

        <div className="bg-red-50 rounded-2xl text-4xl flex items-center border">
          <div className="m-auto">
            <h1 className="text-yellow-300">Total Sales</h1>
            <p>$5000</p>
          </div>
        </div>

        <div className="bg-blue-100 p-4  rounded-2xl text-4xl  flex items-center border">
          <div className="m-auto">
            <h1 className="text-yellow-300">Total Added Items</h1>
            <p>{20 + addedproducts.length}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[2fr,0.7fr] mt-10">
       <img
          src="https://pnp.github.io/sp-dev-fx-controls-react/assets/BarChart.png"
          alt="graph"
          className=" w-full"
        />
        <div className=" p-4">
        <div className=" h-fit border rounded-xl bg-slate-100 text-left text-xl p-5">
          <h1 className="font-dark text-3xl"> Sales Review </h1>
          <hr />
          <div className="my-4 ">
            <h1 className="bg-slate-200 p-1 ">Total Orders <BookIcon fontSize="large"/>:</h1>
          </div>
          <div className="my-4">
            <h1 className="bg-slate-200 p-1">Shipped Orders <LocalShippingIcon fontSize="large"/>: </h1>
          </div>
          <div className="my-4">
            <h1 className="bg-slate-200 p-1">Cancelled Orders <CancelIcon fontSize="large"/>: </h1>
          </div>
        </div>
        <Link to='/admin/addnewItem'>
        <button className="text-2xl my-4 p-2 bg-blue-600 hover:bg-blue-800 w-full text-white rounded-lg">Add a New Item</button>
        </Link>
        
        </div>
       
      </div> 

      
    </div>
  );
}

export default Dashboard;
