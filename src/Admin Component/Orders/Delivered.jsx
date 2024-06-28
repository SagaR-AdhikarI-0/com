import React, { useEffect, useState } from "react";
import { fireDb } from "../../../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import axios from "axios";

function Delivered() {
  const [items, setItems] = useState([]);

  //for getting the delivered order Id
  useEffect(() => {
    const getDataFromFireBase = async () => {
      const valRef = collection(fireDb, "Delivered Orders");
      const data = await getDocs(valRef);
      const alldata = data.docs.map((val) => ({ ...val.data(), id: val.id }));
      setItems(alldata);
      console.log(alldata);
      console.log(data);
    };
    getDataFromFireBase();
  }, []);

  useEffect(() => {
    console.log(items);
  });
  //for getting the all details
  useEffect(() => {
    const getDetailFromFirebase = async () => {
      const valueRef = collection(fireDb);
    };
  });

  return (
    <div className="m-1">
      <div className="text-left text-3xl font-bold p-6 bg-slate-200  flex justify-between ">
        <div>
          <span>Delivered Items</span>
          <p className="font-normal text-[17px] text-left  text-blue-500">
            This section includes all the items delivered to the costumers
          </p>
        </div>{" "}
        <div className="content-end">
          <Link
            to="/admin/orders"
            className="font-normal bg-green-500 text-xl hover:bg-green-600 text-white px-9 py-2 rounded"
          >
            All
          </Link>
        </div>
      </div>

      <table className="text-lg w-full text-left p-6 my-3">
        <thead>
          <tr className="text-teal-600 bg-yellow-50">
            <td className="p-3"> Order Id</td>
            <td className="p-3">Customer</td>
            <td className="p-3">Address</td>
            <td className="p-3">Items</td>
            <td className="p-3">Status</td>
            <td className="p-3">Date</td>
          </tr>
        </thead>
        <tbody className="">
          {items.map((item, index) => (
            <tr className={` m-2  ${index % 2 === 0 ? "bg-green-100" : ""}`} key={index}>
             
                <>
                  <td className="p-3 ">{item.orderId}</td>
                  <td className="p-3 ">{item.costumer}</td>
                  <td className="p-3 ">{item.address}</td>
                  <td className="p-3 ">{item.itemId.length}</td>
                  <td className="p-3 ">
                    {" "}
                    <span className="py-2 px-3 m-1 bg-yellow-200 rounded-lg">
                      Delivered
                    </span>
                  </td>
                  <td className="p-2 ">
                    { Date(item.date).toLocaleString()}
                  </td>
                </>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Delivered;
