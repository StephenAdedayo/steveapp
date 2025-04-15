import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex w-full md:flex-row flex-col  border border-gray-400">
      <div className="flex-[50%]   w-full lg:p-0 p-5 flex items-center justify-center">
        <div className="">
          <div className="flex  items-center gap-5">
            <p className="h-0.5 bg-gray-400 w-10"></p>
            <p className="uppercase">our bestsellers</p>
          </div>

          <div>
            <p className="prata-regular  text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              Latest Arrivals
            </p>
          </div>

          <div className="flex gap-5 items-center">
            <p className="uppercase">shop now</p>
            <p className="h-0.5 w-10 font-bold bg-gray-400"></p>
          </div>
        </div>
      </div>

      <div className="flex-[50%]">
        <img className="w-full  " src={assets.hero_img} alt="" />
      </div>
    </div>
  );
};

export default Hero;
