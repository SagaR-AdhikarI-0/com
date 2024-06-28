// import { addDoc, collection, getDocs,deleteDoc, doc,  writeBatch} from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { fireDb } from "../../../Firebase/Firebase";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import axios from "axios";
// import { Link, NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { set } from "react-hook-form";
// function Orders() {
//   const isAdmin=useSelector(state=>state.auth.isAdmin)
// useEffect(()=>{
 
//   console.log(isAdmin)
// },[])



//   const [items, setItems] = useState([]);

//   const [deliveredItems,setDeliveredItems]=useState([]);

//   const [filteredItems,setfilteredItems]=useState();

//   const [id, setIds] = useState();
//   const [viewItmes, setViewItems] = useState([]);
//   const [clickedRowIndex, setclickedRowIndex] = useState(null);
//   const [selectedItem, setSelectedItems] = useState([]);

//   //for viewing the product detail
//   const handleClick = async (ids, index) => {
//     try {
//       const pormise = ids.map(async (id) => {
//         const data = await axios.get(`https://fakestoreapi.com/products/${id}`);
//         console.log(data.data);
//         setclickedRowIndex(index);
//         console.log(clickedRowIndex);
//         return data.data;
//       });
//       const product = await Promise.all(pormise);

//       setViewItems(product);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //gpt code
//   const handleCheckBoxChange = (detail) => {
//     setSelectedItems((prevSelectedItems) => {
//       const index = prevSelectedItems.findIndex(
//         (item) => item.orderId === detail.orderId
//       );
//       if (index === -1) {
//         return [...prevSelectedItems, detail];
//       } else {
//         return prevSelectedItems.filter(
//           (item) => item.orderId !== detail.orderId
//         );
//       }
//     });
//   };

//   useEffect(() => console.log(selectedItem), [selectedItem]);



//   //handle send delivered order
//   const handleSendToDelivered = async () => {
//     const deliveredRefrence = collection(fireDb, "Delivered Orders");
//     await addDoc(deliveredRefrence, { selectedItem });
//     setSelectedItems([]);

//   };

//   function removeItemsFromArray(all = [], delivered = []) {
//     const filteredItems = all.filter(items => {
//       deliveredItems.map((item)=>{item.selectedItem.map(item=>item.orderId!==items.orderId)})
//     });
  
//     return filteredItems;
//     console.log(filteredItems)
//   }
  


//   useEffect(() => {
//     const getDataFromFireBase = async () => {
//       const valRef = collection(fireDb, "Orders");
//       const data = await getDocs(valRef);
//       const alldata = data.docs.map((val) => ({ ...val.data(), id: val.id }));
//       setItems(alldata);
//       console.log(alldata);
//       console.log(data);
//     };
//     getDataFromFireBase();
//     const getDeliveredOrders= async ()=>{
//       const valRef=collection(fireDb,'Delivered Orders');
//       const data=await getDocs(valRef);
//       const alldata=data.docs.map((val)=>({...val.data(),id:val.id}))
//       setDeliveredItems(alldata)
//       console.log(alldata)
//       console.log(deliveredItems)
//     };
//     getDeliveredOrders()
  

//     console.log(filteredItems)
   
//   }, []);


//   useEffect(()=>{
//     const final=removeItemsFromArray(items,deliveredItems)
//     console.log(final)
//    console.log(deliveredItems[0])
//     setItems(final);
    
  
 
//   },[])



//   return (
//     <div>
//       <div className="bg-slate-100 text-left font-semibold text-xl p-6">
//         Manage all the orders
//       </div>
//       <div className="flex justify-between items-center">
//         <div className="bg-slate-50 flex justify-start lg:gap-12 py-4 px-1">
//           <FilterListIcon fontSize="large" />
//           <div className="text-xl font-bold p-2">All</div>

//           <Link
//             to="/admin/orders/delivered"
//             className="p-2 bg-blue-400 hover:bg-blue-500 rounded-lg text-white"
//           >
//             Delivered
//           </Link>
//           <Link className="p-2 bg-green-400 rounded-lg text-white">
//             View History
//           </Link>
//         </div>
//         <div className="">
//           <button
//             onClick={handleSendToDelivered}
//             className=" m-auto px-6 py-2 text-white rounded-lg mx-4 text-xl hover:bg-red-600  bg-red-500"
//           >
//             Send to Delivered
//           </button>
//         </div>
//       </div>

//       <div>
//         <table className="text-lg w-full text-left my-3  ">
//           <thead>
//             <tr className="text-teal-600 bg-yellow-50 ">
//               <td className="p-3">#</td>
//               <td className="p-3"> Order Id</td>
//               <td className="p-3">Customer</td>
//               <td className="p-3">Address</td>
//               <td className="p-3">Items</td>
//               <td className="p-3">Status</td>
//               <td className="p-3">Date</td>
//               <td className="p-3">{""}</td>
//             </tr>
//           </thead>

//           {items?.map((item, index) => (
//             <tbody key={item.id}>
//               <tr
//                 className={` mt-3 ${index % 2 === 0 ? " bg-green-50 " : ""}`}
//                 key={item.orderId}
//               >
//                 <td className="p-3">
//                   {" "}
//                   <input
//                     type="checkbox"
//                     onChange={() => {
//                       handleCheckBoxChange({
//                         id:item.id,
//                         orderId: item.orderId,
//                         costumer: item.costumer,
//                         address: item.address,
//                         date: item.date,
//                         items: item.itemsId.length,
//                         itemId: item.itemsId,
//                         date: new Date(),
//                       });
//                     }}
//                   />
//                 </td>
//                 <td className="p-3">{item.orderId}</td>
//                 <td className="p-3">{item.costumer}</td>
//                 <td className="p-3">{item.address}</td>
//                 <td className="p-3">{item.itemsId.length}</td>
//                 <td className="p-3">
//                   <span className="bg-orange-400 text-white rounded py-1 px-2">
//                     Pending
//                   </span>
//                 </td>
//                 <td>{item.date}</td>
//                 <td>
//                   <ExpandMoreIcon
//                     onClick={() => handleClick(item.itemsId, index)}
//                     fontSize="large"
//                   />
//                 </td>
//               </tr>

//               {clickedRowIndex === index ? (
//                 <tr className="">
//                   <td colSpan={8}>
//                     <div>
//                       {viewItmes.map((product) => (
//                         <div
//                           className="bg-slate-200 mx-28 my-4 items-center p-4 
//                            grid grid-cols-4 gap-10"
//                           key={product.id}
//                         >
//                           <div className="">
//                             <img
//                               src={product.image}
//                               className="h-20 w-20 border border-red-400 p-1"
//                               alt=""
//                             />
//                             <div className="max-w-40 font-semibold ">
//                               {product.title}
//                             </div>
//                           </div>
//                           <div>
//                             <div className=" text-red-700">
//                               {" "}
//                               <span className="font-semibold text-blue-700">
//                                 Price:
//                               </span>
//                               {product.price}
//                             </div>
//                             <div className="text-red-700">
//                               {" "}
//                               <span className="text-blue-500 ">Quantity:</span>
//                               {1}
//                             </div>
//                           </div>
//                           <div>
//                             <div className="text-gray-600 font-semibold">
//                               Coustumer:
//                               <span className="text-gray-900 ">
//                                 {item.costumer}
//                               </span>
//                             </div>
//                             <div className="text-gray-600 font-semibold">
//                               {" "}
//                               Address:{" "}
//                               <span className="text-gray-900 ">
//                                 {item.address}
//                               </span>
//                             </div>
//                             <div className="text-gray-600 font-semibold">
//                               Email:{" "}
//                               <span className="text-gray-900 ">
//                                 {item.email}
//                               </span>
//                             </div>
//                             <div className="text-gray-600 font-semibold">
//                               {" "}
//                               Phone:{" "}
//                               <span className="text-gray-900 ">
//                                 {item.phone_number}
//                               </span>
//                             </div>
//                           </div>
//                           <div>
//                             <div className="">
//                               <button className="bg-red-500 p-2 text-white rounded">
//                                 SetDelivered
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </td>
//                 </tr>
//               ) : null}
//             </tbody>
//           ))}
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Orders;

import { addDoc, collection, getDocs, deleteDoc,doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fireDb } from "../../../Firebase/Firebase";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Orders() {
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const [items, setItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    const getDataFromFirebase = async () => {
      const valRef = collection(fireDb, "Orders");
      const data = await getDocs(valRef);
      const allData = data.docs.map((val) => ({ ...val.data(), id: val.id }));
      setItems(allData);
    };
    getDataFromFirebase();

    const getDeliveredOrders = async () => {
      const valRef = collection(fireDb, 'Delivered Orders');
      const data = await getDocs(valRef);
      const allData = data.docs.map((val) => ({ ...val.data(), id: val.id }));
      setDeliveredItems(allData);
    };
    getDeliveredOrders();
  }, []);

  const handleSendToDelivered = async () => {
    try {
      const batch = [];
      selectedItem.forEach(item => {
        const orderRef = doc(fireDb, "Orders", item.id);
        const deliveredRef = collection(fireDb, "Delivered Orders");
        batch.push(deleteDoc(orderRef));
        batch.push(addDoc(deliveredRef, item));
      });
      await Promise.all(batch);
      setSelectedItem([]);
    } catch (error) {
      console.error("Error sending orders to delivered:", error);
    }
  };

  const handleCheckBoxChange = (detail) => {
    setSelectedItem((prevSelectedItems) => {
      const index = prevSelectedItems.findIndex(
        (item) => item.id === detail.id
      );
      if (index === -1) {
        return [...prevSelectedItems, detail];
      } else {
        return prevSelectedItems.filter(
          (item) => item.id !== detail.id
        );
      }
    });
  };

  return (
    <div>
      <div className="bg-slate-100 text-left font-semibold text-xl p-6">
        Manage all the orders
      </div>
      <div className="flex justify-between items-center">
        <div className="bg-slate-50 flex justify-start lg:gap-12 py-4 px-1">
          <FilterListIcon fontSize="large" />
          <div className="text-xl font-bold p-2">All</div>

          <Link
            to="/admin/orders/delivered"
            className="p-2 bg-blue-400 hover:bg-blue-500 rounded-lg text-white"
          >
            Delivered
          </Link>
          <Link to='/admin' className="p-2 bg-green-400 rounded-lg text-white">
            View Dashboard
          </Link>
        </div>
        <div className="">
          <button
            onClick={handleSendToDelivered}
            className=" m-auto px-6 py-2 text-white rounded-lg mx-4 text-xl hover:bg-red-600  bg-red-500"
          >
            Send to Delivered
          </button>
        </div>
      </div>

      <div>
        <table className="text-lg w-full text-left my-3  ">
          <thead>
            <tr className="text-teal-600 bg-yellow-50 ">
              <td className="p-3">#</td>
              <td className="p-3"> Order Id</td>
              <td className="p-3">Customer</td>
              <td className="p-3">Address</td>
              <td className="p-3">Items</td>
              <td className="p-3">Status</td>
              <td className="p-3">Date</td>
              <td className="p-3">{""}</td>
            </tr>
          </thead>

          {items?.filter(item => !deliveredItems.some(deliveredItem => deliveredItem.id === item.id)).map((item, index) => (
            <tbody key={item.id}>
              <tr
                className={` mt-3 ${index % 2 === 0 ? " bg-green-50 " : ""}`}
                key={item.orderId}
              >
                <td className="p-3">
                  {" "}
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleCheckBoxChange({
                        id:item.id,
                        orderId: item.orderId,
                        costumer: item.costumer,
                        address: item.address,
                        date: item.date,
                        items: item.itemsId.length,
                        itemId: item.itemsId,
                        date: new Date(),
                      });
                    }}
                  />
                </td>
                <td className="p-3">{item.orderId}</td>
                <td className="p-3">{item.costumer}</td>
                <td className="p-3">{item.address}</td>
                <td className="p-3">{item.itemsId.length}</td>
                <td className="p-3">
                  <span className="bg-orange-400 text-white rounded py-1 px-2">
                    Pending
                  </span>
                </td>
                <td>{item.date}</td>
                <td>
                  <ExpandMoreIcon
                    onClick={() => handleClick(item.itemsId, index)}
                    fontSize="large"
                  />
                </td>
              </tr>

              {clickedRowIndex === index ? (
                <tr className="">
                  <td colSpan={8}>
                    <div>
                      {viewItmes.map((product) => (
                        <div
                          className="bg-slate-200 mx-28 my-4 items-center p-4 
                           grid grid-cols-4 gap-10"
                          key={product.id}
                        >
                          <div className="">
                            <img
                              src={product.image}
                              className="h-20 w-20 border border-red-400 p-1"
                              alt=""
                            />
                            <div className="max-w-40 font-semibold ">
                              {product.title}
                            </div>
                          </div>
                          <div>
                            <div className=" text-red-700">
                              {" "}
                              <span className="font-semibold text-blue-700">
                                Price:
                              </span>
                              {product.price}
                            </div>
                            <div className="text-red-700">
                              {" "}
                              <span className="text-blue-500 ">Quantity:</span>
                              {1}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 font-semibold">
                              Coustumer:
                              <span className="text-gray-900 ">
                                {item.costumer}
                              </span>
                            </div>
                            <div className="text-gray-600 font-semibold">
                              {" "}
                              Address:{" "}
                              <span className="text-gray-900 ">
                                {item.address}
                              </span>
                            </div>
                            <div className="text-gray                            600 font-semibold">
                              Email:{" "}
                              <span className="text-gray-900 ">
                                {item.email}
                              </span>
                            </div>
                            <div className="text-gray-600 font-semibold">
                              {" "}
                              Phone:{" "}
                              <span className="text-gray-900 ">
                                {item.phone_number}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="">
                              <button className="bg-red-500 p-2 text-white rounded">
                                SetDelivered
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Orders;


