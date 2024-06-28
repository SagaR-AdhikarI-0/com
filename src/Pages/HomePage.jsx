import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Description from "../Components/Description";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "../../src/Image/Men.webp";
import Image1 from "../../src/Image/electronics.webp";
import Image2 from "../../src/Image/Women.webp";
import Image3 from "../../src/Image/gym.webp";
import CoverImg from "../../src/Image/Cover.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function HomePage() {
  let toggle = false;
  const [width, setWidth] = useState();

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  useEffect(() => {
    const screenLength = window.innerWidth;
  }, [width]);
  // setInterval(() => {
  //   toggleBackground();
  // }, 5000);

  //for our Features and services
  const descItems = [
    {
      title: "Electronics",
      image:
        "https://img.freepik.com/free-photo/laptop-with-camera-smartphone-table_23-2148036986.jpg?t=st=1716362095~exp=1716365695~hmac=385d9e14b4a260651fb6b92908e4f47ddc4fd56d61c8c29f134e6e64a0502e81&w=2000",
      text: "",
    },
    {
      title: `Men's Clothing`,
      image:
        "https://img.freepik.com/free-photo/young-man-shopping-menswear-store-talking-phone_1303-31006.jpg?t=st=1716362217~exp=1716365817~hmac=4bb61d40ca33f76457ac5b225d5d831413ea40cc2567683d18fdd1a901af21c2&w=2000",
      text: "",
    },
    {
      title: `Womens Clothing`,
      image:
        "https://img.freepik.com/free-photo/young-brunette-with-paper-bags-shop_23-2147786815.jpg?t=st=1716362320~exp=1716365920~hmac=a38ba41a16d0487cb1ea30f5a09ac147609ef8677391df7688d904e39505890d&w=2000",
      text: "",
    },
  ];

  // Our partners//
  const ourPartners = [
    "https://discover.daraz.com/images/Group_1083-1644460875.svg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3nkNAdwM5R9SQpW-dlZa2m_tbqDT9HzN1vDvHCv_lbw&s",
    "https://investors.shopify.com/files/design/logo/shopify_glyph_for_social.png",
    "data:image/png;base64,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",
    "https://shopme.mv/shopmelogo_white.png",
  ];

  return (
    <div className="">
      <motion.div
        key="HeroPic"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-h-[700px]">
          <img src={CoverImg} alt="" className="max-h-[700px] w-full" />{" "}
        </div>
      </motion.div>

      <div className=" my-4  ">
        <div className=" py-6 text-black px-4">
          <p className="text-blue-500">
            {" "}
            <Link to="/products">View now </Link>
          </p>
          <span className="font-extrabold text-6xl">New Arrivals</span>
        </div>
        <div className="lg:flex lg:justify-center gap-20 p-4">
          {descItems.map((item) => (
            <Description
              key={item.image}
              title={item.title}
              image={item.image}
              text={item.text}
            />
          ))}
        </div>
      </div>
      <div className="  lg:p-10 lg:m-10 m-4  ">
        <div className="font-bold text-4xl lg:text-5xl  p-3 lg:p-8">
        <span className="text-yellow-950">Elpore</span>    the Unlimited  <span className="text-blue-950">Products </span>
        </div>
        <div className="grid grid-cols-2  bg-[#f0efed]  ">
          <div className="grid border-r-8 border-l border-t border-black border-b-8">        
            <img src={Image} alt="" className=" rounded-lg  " />
            <span></span>
          </div>
          <div className="grid  border-t-8  border-black border-r border-b ">
            <img src={Image2} alt="" className=" rounded-lg " />
          </div>
        </div>
      </div>
      <div className="md:relative md:mt-40 ">
        <div className=" grid md:px-60 bg-slate-800 md:mx-20 md:absolute left-20 md:top-[-110px] lg:rounded-lg py-2">
          <p className="text-yellow-400">Trusted by 1000+ customers</p>
          <h1 className="underline  text-5xl text-white">Our parteners</h1>

          <div className="lg:flex   lg:gap-20 gap-10 lg:justify-center  grid  grid-cols-2  lg:p-5   ">
            {ourPartners.map((i) => (
              <motion.div
                key={i}
                ref={ref}
                animate={controls}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 1 }}
                className="flex justify-center mt-4 lg:flex-none lg:m-0"
              >
                <img
                  src={i}
                  className="lg:h-14 rounded w-16 h-10 bg-blend-screen"
                  key={i}
                ></img>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
