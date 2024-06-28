import React, { useEffect, useState } from "react";

function Contacts() {
    const [longestLength,setLongestLength]=useState()
  const [details, setDetails] = useState([
    {
      Firstname: "Ram",
      LastName: "Khadka",
      ContactNo: "980044999",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sequi ab, deserunt officiis mollitia eum rerum optio quod sint labore autem aliquam nisi sunt accusantium assumenda expedita eveniet debitis explicabo.  Your services are well reach me for the any wholesale orders",
    },
    {
      Firstname: "Ram",
      LastName: "Khadka",
      ContactNo: "980044999",
      message: "Your services are well reach me for the any wholesale orders",
    },
    {
      Firstname: "Ram",
      LastName: "Khadka",
      ContactNo: "980044999",
      message: "Your services are well reach me for the any wholesale orders",
    },
    {
        Firstname: "Ram",
        LastName: "Khadka",
        ContactNo: "980044999",
        message: "Your services are well reach me for the any wholesale orders",
      },
  ]);




  return (
    <div>
      <div className="bg-slate-100 my-3  p-8 text-xl font-bold text-left mx-5">
        View the Costumer Opinion on Your store here
      </div>
      <div className="text-left grid grid-cols-2  ">
        {details.map((detail) => (
          <div className=" p-6 shadow-lg bg-green-50 shadow-yellow-100 border m-7 min-h-48">
            <div>
              <span className="text-lg font-semibold text-blue-900">
                {" "}
                Name:{" "}
              </span>{" "}
              {detail.Firstname} {detail.LastName}
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-900">
                Phone Number:{" "}
              </span>{" "}
              {detail.ContactNo}
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-900">
                Message:{" "}
              </span>{" "}
              {detail.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
