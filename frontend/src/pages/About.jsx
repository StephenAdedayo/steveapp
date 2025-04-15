import React from "react";
import Text from "../components/Text";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div className="w-full ">
      <div className="grid place-items-center">
        <Text text1={"About"} text2={"us"} />
      </div>

      <div className="flex gap-10 flex-col md:flex-row  items-center mt-10">
        <div className="flex-[50%]">
          <img src={assets.about_img} alt="" className="w-fit" />
        </div>
        <div className="flex-[50%]">
          <div className="space-y-5">
            <p className="text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Temporibus pariatur nihil iste? Quod, tenetur modi corrupti
              molestias veritatis harum mollitia.
            </p>
            <p className="text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores dolor id reprehenderit nesciunt facere saepe enim
              perspiciatis eos ad nam.
            </p>
          </div>

          <div className="mt-5">
            <p className="text-gray-600 font-bold mb-5">Our Mission</p>
            <p className="text-gray-500">
              At RoyalBoutique, our mission is to inspire confidence and elevate
              style by providing premium footwear, bags, and accessories for men
              and women. We are committed to delivering products that combine
              elegance, quality, and innovation, ensuring that every customer
              feels empowered and fashionable in their daily lives. Our focus is
              on exceptional craftsmanship, attention to detail, and customer
              satisfaction, making RoyalBoutique the go-to destination for
              timeless fashion and modern trends.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Text text1={"why"} text2={"choose us"} />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3">
          <div className="border xl:p-20 p-10 space-y-4 border-gray-300">
            <p className="text=gray-500 font-bold text-[14px]">
              Quality Assurance:
            </p>
            <p className="text-gray-500 text-base text-[14px]">
              {" "}
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>

          <div className="border xl:p-20 p-10 space-y-4 border-gray-300">
            <p className="text=gray-500 font-bold text-[14px]">Convenience:</p>
            <p className="text-gray-500 text-[14px]">
              {" "}
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>

          <div className="border xl:p-20 p-10 space-y-4 border-gray-300">
            <p className="text=gray-500 font-bold text-[14px]">
              Exceptional Customer Service:
            </p>
            <p className="text-gray-500 text-[14px]">
              {" "}
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
