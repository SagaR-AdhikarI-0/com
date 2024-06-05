import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from '@mui/icons-material/Place';
function ContactPage() {
  const [data, setData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setData(data.firstName);
    localStorage.setItem("Contacts", JSON.stringify(data));
  };
  return (
    <>
    <div className="lg:grid lg:grid-cols-2  lg:mx-10">
      <div>
        <img
          src=" https://img.freepik.com/free-vector/background-with-hand-drawn-contact-elements_23-2147608293.jpg?t=st=1716719603~exp=1716723203~hmac=917308054f4c4ff5ed2aba6406563439ba98943ebbd610e5819a495af9ad88b8&w=1380"
          className=" h-[75vh] "
          alt="contact"
        />
      </div>
      <div>
        <form
          className="bg-slate-100 shadow-2xl lg:grid gap-4 mt-16 lg:ml-20 text-left  p-12 max-w-[450px] border rounded-3xl text-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="First Name" className="p-2 text-red-900">
              First Name:
            </label>
            <br></br>
            <input
              {...register("firstName", { required: true })}
              aria-invalid={errors.firstName ? "true" : "false"}
              type="text"
              className="w-full p-1 border "
            />
            {errors.firstName?.type === "required" && (
              <p className="text-[12px] px-4 text-red-600" role="alert">
                First name is required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="Last Name" className="p-2 text-red-900">
              Last Name:
            </label>
            <br />
            <input
              type="text"
              className="w-full p-1  border"
              {...register("lastName", { required: true })}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {errors.lastName?.type === "required" && (
              <p role="alert" className="text-[12px] px-4 text-red-600">
                Last Name is required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contactNo" className="p-2 text-red-900">
              Contact Number:
            </label>
            <br />
            <input
              {...register("contactNo", { required: true })}
              aria-invalid={errors.contactNo ? "true" : "false"}
              type="number"
              className="w-full p-1  border"
            />
            {errors.contactNo?.type === "required" && (
              <p role="alert" className="text-[12px] px-4 text-red-600">
                Number is required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="Description" className="p-2 text-red-900 "></label>
            <br />
            <textarea
              name="Know me"
              id="1"
              placeholder="Your opinion  on us"
              className="p-3 w-full border "
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 p-3 my-2 text-white"
          >
            Submit
          </button>
        </form>
       
        {data && (
    
          <p className="font-bold py-10 text-xl">
            {" "}
            Hi {"  "}{" "}
            <span className="text-red-800 text-3xl">
              {data}.<br />{" "}
            </span>{" "}
            Thank you for your Information
          </p>
          
        
           
        )}
        
      </div>
    
    </div>
      <div className="mt-20 ">
      <h1 className="text-3xl font-bold p-1 text-blue-700">For general Enquery</h1>
      <hr />
     <div className="flex flex-col lg:flex-row lg:justify-evenly  mt-4 ">
        <a className="my-2 ">
          <EmailIcon fontSize="large" />: ourshop@gmail.com
        </a>
        <a className="my-2">
          <LocalPhoneIcon fontSize="large" />: 9846883501
        </a>

        <a className="my-2">
          <FacebookIcon fontSize="large" />
          :Our__Shop_
        </a>
        <a className="my-2">
          <InstagramIcon fontSize="large" />
          :_Our__Shop_
        </a>
        </div>
     
    </div>
    </>
  );
}

export default ContactPage;
