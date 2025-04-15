import React, { useContext, useEffect, useState } from "react";
import Text from "./Text";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products } = useContext(ShopContext);

  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const product = products.filter((item) => item.bestSeller);
    setBestSellers(product.slice(0, 5));
  }, [products]);

  return (
    <div className="my-20 w-full">
      <div className="grid place-items-center text-3xl">
        <Text text1={"Best"} text2={"Sellers"} />
      </div>

      <p className="w-3/4 m-auto mb-3 text-xs sm:text-sm md:text-base text-center text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure accusamus
        at necessitatibus neque quibusdam id.
      </p>

      <div className="mt-10">
        <ProductItem products={bestSellers} />
      </div>
    </div>
  );
};

export default BestSellers;
