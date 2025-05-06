import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-5 lg:px-40">
      <footer className=" flex flex-col md:flex-row gap-10 py-5 my-20">
        <div className="space-y-5 flex-[70%] gap-10">
          <img className="w-[150px]" src={assets.logo} alt="" />
          <p className="w-full md:w-[500px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            blanditiis. Commodi ex beatae, alias unde asperiores nesciunt
            dignissimos esse eligendi.
          </p>
        </div>

        <div className="flex-[30%] w-full gap-10 flex flex-col lg:flex-row ">
          <div className="space-y-7">
            <p className="uppercase text-bold text-xl">company</p>

            <ul className="text-gray-500">
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/about'}>About us</Link>
              </li>
              <li>
                <Link >Delivery</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-7">
            <p className="uppercase text-bold text-xl">get in touch</p>

            <div className="text-gray-500">
              <p>+1-212-456-7890</p>
              <p>contact@foreveryou.com</p>
            </div>
          </div>
        </div>
      </footer>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ forever.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
