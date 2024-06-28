import React from "react";
import ReactDOM from "react-dom/client";
import SignupForm from "./Components/Login/SignupForm.jsx";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import ProductPage from "./Pages/ProductPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import ViewProduct from "./Components/Product/ViewProduct.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import AdminHomePage from "./Admin Component/AdminHomePage.jsx";
import Dashboard from "./Admin Component/Home/Dashboard.jsx";
import AddNewItem from "./Admin Component/AddNewItem/AddNewItem.jsx";
import Orders from "./Admin Component/Orders/Orders.jsx";
import Delivered from "./Admin Component/Orders/Delivered.jsx";
import Protected from "../Protected.jsx";
import Contacts from "./Admin Component/Contacts.jsx";
import { isAction } from "@reduxjs/toolkit";
import AboutPage from "./Pages/AboutPage.jsx";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
const isAdmin=()=>{
  useSelector(state=>state.auth.isAdmin)
}
const router = createBrowserRouter([

  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "about",
        element:<AboutPage/>,
      },
      {
        path: "products/:id",
        element: <ViewProduct />,
      },
      {
        path: "contacts",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <SignupForm />,
      },
    ],
  }
  
 ,
 {
  path:'/admin',
  element:<Protected  element={<AdminHomePage/>} />,
  children:[
     {
      path:'',
      element:<Protected  element={<Dashboard/>} />
     },
      {
        path: "addnewItem",
        element: <Protected  element={<AddNewItem/>} />
     },
     {
      path: "orders",
      element:<Protected element={<Orders/>}  />
     },
     {
      path: "orders/:delivered",
      element:<Protected element={<Delivered/>} />
     },
     {
      path:'contacts',
      element:<Protected element={<Contacts/>} />
     }

    ]
 }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    
      <ToastContainer
position="top-right"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition: Bounce
 bodyClassName="toastBody"
/>


    </React.StrictMode>
  </Provider>
);
