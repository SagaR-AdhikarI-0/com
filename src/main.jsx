import React from "react";
import ReactDOM from "react-dom/client";
import SignupForm from "./Components/Login/SignupForm.jsx";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ProductPage from "./Pages/ProductPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import ViewProduct from "./Components/Product/ViewProduct.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import AdminHomePage from "./Admin Component/AdminHomePage.jsx";
import Dashboard from "./Admin Component/Home/Dashboard.jsx";
import AddNewItem from "./Admin Component/AddNewItem/AddNewItem.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path:'cart',
        element:<CartPage/>
      },
      {
        path:'about',
        element:<>I am about</>
      },
      {
        path:'products/:id',
        element:<ViewProduct/>
      },
      {
        path:'contacts',
        element:<ContactPage/>
      },
      {
        path:'login',
        element:<SignupForm/> 
      },
    
     
    ],
  
  },
  {
    path:'admin',
    element:<AdminHomePage/>,
    children:[
      {
        path:'',
        element:<Dashboard/>
      },
      {
        path:'addnewItem',
        element:<AddNewItem/>
      }
    ]
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
