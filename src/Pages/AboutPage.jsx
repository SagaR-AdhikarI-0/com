import React from "react";
import Image from "../Image/About.jpg";

function AboutPage() {
  return (
    <div className="lg:grid grid-cols-2 p-10  ">
      <div>
        <img src={Image} alt="" className="m-auto lg:h-[67vh] h-[50vh] rounded-lg" />
      </div>

      <div className="text-lg">
        <h1 className="font-extrabold text-5xl mt-6 lg:-0">About</h1>
        <p className="lg:text-left lg:my-8">
          Welcome to our online store! We're thrilled to have you here. If you
          have any questions about our products, need assistance with your
          order, or simply want to chat, don't hesitate to get in touch.
        </p>
        <p className="lg:text-left">
          Our dedicated team is committed to providing you with excellent
          service. You can reach us via the contact form below or directly at
          [Your Email Address]. We aim to respond promptly to all inquiries
          because your satisfaction is our priority. Whether you're looking for
          advice on products or have feedback for us, we're here to help make
          your shopping experience exceptional.We're continuously striving to
          enhance our offerings and customer support. Our goal is to build
          lasting relationships with our customers by providing personalized
          service and a seamless shopping experience. Your trust in us is
          important, and we're here to assist you every step of the way. Thank
          you for choosing [Your Company Name] for your online shopping needs.
          We look forward to serving you!
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
