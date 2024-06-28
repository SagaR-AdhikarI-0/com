import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PlaceIcon from "@mui/icons-material/Place";
import Image from '../Image/Contact.png'
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
        <div className="m-auto mt-12">
          <img src={Image} className=" lg:h-[70vh]  h-[50vh] m-auto lg:m-0 " alt="contact" />
        </div>
        <div>
          <h1 className="font-extrabold text-5xl mt-6">Contact Us</h1>
          <form
            className=" lg:grid grid-cols-2 gap-4 p-7 lg:p-0 lg:mt-10 font-semibold text-left rounded-3xl text-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="First Name">First Name:</label>
              <br></br>
              <input
                {...register("firstName", { required: true })}
                aria-invalid={errors.firstName ? "true" : "false"}
                type="text"
                className="w-full border-black p-1 border "
              />
              {errors.firstName?.type === "required" && (
                <p className="text-[12px] px-4 text-red-600" role="alert">
                  First name is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="Last Name">Last Name:</label>
              <br />
              <input
                type="text"
                className="w-full p-1  border border-black"
                {...register("lastName", { required: true })}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName?.type === "required" && (
                <p role="alert" className="text-[12px] px-4 text-red-600">
                  Last Name is required
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label htmlFor="contactNo">Contact Number:</label>
              <br />
              <input
                {...register("contactNo", { required: true })}
                aria-invalid={errors.contactNo ? "true" : "false"}
                type="number"
                className="w-full p-1 border-black border"
              />
              {errors.contactNo?.type === "required" && (
                <p role="alert" className="text-[12px] px-4 text-red-600">
                  Number is required
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label
                htmlFor="Description"
                className="p-2 text-red-900 "
              ></label>
              <br />
              <label htmlFor="Message">Your Message</label>
              <textarea
                name="Know me"
                id="1"
                placeholder="Your opinion  on us"
                className="p-3 w-full border border-black"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black col-span-2 p-3 my-2 text-white"
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
      {/* <div className="mt-20 ">
        <h1 className="text-3xl font-bold p-1 text-blue-700">
          For general Enquery
        </h1>
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
      </div> */}
    </>
  );
}

export default ContactPage;
