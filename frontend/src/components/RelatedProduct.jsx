import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Text from "./Text";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  const getRelated = () => {
    if (products.length > 0) {
      let productCopy = products.slice();

      productCopy = productCopy.filter((item) => item.category === category);
      productCopy = productCopy.filter(
        (item) => item.subCategory === subCategory
      );
      setRelated(productCopy.slice(0, 5));
    }
  };

  useEffect(() => {
    getRelated();
  }, [products]);

  return (
    <div className="w-full my-20">
      <div className="grid place-items-center mb-5">
        <Text text1={"Related"} text2={"Products"} />
      </div>

      <div className="">
        <ProductItem products={related} />
      </div>
    </div>
  );
};

export default RelatedProduct;
