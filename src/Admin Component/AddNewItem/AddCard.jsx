import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { fireDb, imageDb } from "../../../Firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { nanoid } from "@reduxjs/toolkit";


function AddCard({ position, onClose }) {
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [loading,setIsloading]=useState(false);
  const [image, setSelectedImage] = useState(
    "https://img.freepik.com/free-vector/images-concept-illustration_114360-298.jpg?t=st=1717405640~exp=1717409240~hmac=80cecf3d39514d0098c55270ba9cc23b10302a05c7dc5300152ae5fe32fd559b&w=1380"
  );
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file); // Save the file to state
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      if (selectedImageFile) {
        const imageRef = ref(imageDb, `file/${v4()}`);
        await uploadBytes(imageRef, selectedImageFile); // Upload the file, not the URL
       
        const imageUrl = await getDownloadURL(imageRef) // Get the download URL of the uploaded image

        const productReference = collection(fireDb, "product");
        await addDoc(productReference, {
          name: data.name,
          image: imageUrl, // Save the download URL
          price: data.price,
          description: data.description,
          category:data.category,
          id:nanoid()
        }).then(()=>setIsloading(false))
        console.log("Document successfully written!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`${position}  overflow-auto shadow-2xl shadow-green-900 border-slate-400 border-2 rounded-2xl max-w-[600px]  bg-slate-200 p-10 z-40   text-lg text-left  `}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" border flex justify-center rounded-lg h-60  m-2">
          <img
            src={image}
            className="h-full w-full rounded-lg border-black border"
            alt="img"
          />
        </div>

        <div className="grid m-1">
          <button
            type="button"
            onClick={handleButtonClick}
            className="bg-green-600 text-white p-2 shadow rounded-lg "
          >
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className=" hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="grid m-2 ">
          <label htmlFor="Name" className="font-bold  ">
            Product Title
          </label>
          <input
            type="text"
            placeholder="Name/ Title of the product"
            {...register("name")}
            className="p-3 rounded-lg w-96 border lg:w-full border-slate-300"
            required
          />
        </div>
        <div className="grid grid-cols-2">
        <div className="grid m-2">
          <label htmlFor="Price" className="font-bold ">
            Price
          </label>
          <input
            type="Number"
            placeholder="Enter the price"
            {...register("price")}
            className="p-3 rounded-lg border border-slate-300"
            required
          />
        </div>
        <div className="grid m-2 ">
          <label htmlFor="Price" className="font-bold ">
            Category
          </label>
          <input
            type="text"
            placeholder="Enter the catagory"
            {...register("category")}
            className="p-3 rounded-lg border border-slate-300"
            required
          />
        </div>
        </div>

        <div className="grid m-2 ">
          <label htmlFor="Description" className="font-bold ">
            Product's Description
          </label>
          <textarea
            name="Description"
            id=""
            rows="4"
            {...register("description")}
            className="rounded-lg border border-slate-300"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3 m-3">
          <button
            className="p-2 bg-blue-600  hover:bg-blue-700 rounded-lg text-white "
            type="submit"
          >
            Add Item
          </button>
          <button
            type="button"
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
       <div className=" top-[50%] right-[50%]"> {loading?<h1>Loading</h1>:null}</div>
      </form>
    </div>
  );
}

export default AddCard;
