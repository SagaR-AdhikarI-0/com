import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { useSelector } from "react-redux";
import SignupForm from "./Components/Login/SignupForm";
import Login from "./Components/Login/Login";


function App() {

 const [alreadyHaveAccount,setAlreadyHaveAccount]=useState(true);
 //onchicking the already have an account
 const handleAlreadyHaveAnAccount=()=>{
   setAlreadyHaveAccount(true)
 }
 const  handleDoNotHaveAccount=()=>{
  setAlreadyHaveAccount(false)
 }
 const isLoggedIn = useSelector((state) => state.auth.login);

 useEffect(()=>{
  console.log(isLoggedIn);
})

  const [items, setItems] = useState();
  useEffect(() => {
    const getLocalStorageItems = localStorage.getItem("cartItems");
    setItems(getLocalStorageItems);
    if (items === null) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  }, []);
return(
 isLoggedIn?<>
 <Header />
 <Outlet />
 <Footer />
</>:

alreadyHaveAccount?<Login  handleDoNotHaveAccount={handleDoNotHaveAccount} />:<SignupForm handleAlreadyHaveAnAccount={handleAlreadyHaveAnAccount}/>

    )
  }


export default App;
