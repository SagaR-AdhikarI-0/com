import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { useSelector } from "react-redux";
import SignupForm from "./Components/Login/SignupForm";

function App() {
  const islogin = useSelector((state) => state.auth.login);
  const [items, setItems] = useState();
  useEffect(() => {
    const getLocalStorageItems = localStorage.getItem("cartItems");
    setItems(getLocalStorageItems);
    if (items === null) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  }, []);
  const [count, setCount] = useState(0);

    return (
      
      <>
        <Header />

       {islogin?<Outlet />:<SignupForm/>}
        <Footer />
      </>
    );
}

export default App;
