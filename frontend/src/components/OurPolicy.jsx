import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="my-20 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      <div className="flex flex-col items-center justify-center">
        <img className="mb-8 w-[40px]" src={assets.exchange_icon} alt="" />
        <p>Easy Policy Exchange</p>
        <p className="text-gray-500">We offer hassle free exchange policy</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img className="mb-8 w-[40px]" src={assets.quality_icon} alt="" />
        <p>7 days return Policy</p>
        <p className="text-gray-500">We provide 7 days free return policy</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img className="mb-8 w-[40px]" src={assets.support_img} alt="" />
        <p>Best customer support</p>
        <p className="text-gray-500">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
