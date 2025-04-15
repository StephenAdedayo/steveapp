import React, { useState } from "react";

const NewsLetter = () => {
  const [news, setNews] = useState("");

  const onSubmitHanlder = (e) => {
    e.preventDefault();

    const inp = {
      news,
    };
    console.log(inp);
  };

  return (
    <div className="w-full my-20 grid place-items-center">
      <p className="text-center mb-5 text-xl md:text-2xl">
        Subscribe now & get 20% off
      </p>
      <p className="text-center mb-5 text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, animi.
      </p>

      <form className="w-full" action="" onSubmit={onSubmitHanlder}>
        <div className="flex w-full  items-center justify-center">
          <input
            value={news}
            onChange={(e) => setNews(e.target.value)}
            placeholder="Enter your email"
            type="text"
            className="outline-0 border border-gray-300 h-10 w-full sm:w-1/2 p-1 placeholder:text-gray-500"
            required
          />
          <button type="submit" className="bg-black/75 h-10 p-2 text-white">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsLetter;
