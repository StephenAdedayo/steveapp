import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ products }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {products.map((item) => 
        <>
          <Link to={`/singleproduct/${item._id}`}>
            <div className="overflow-hidden">
              <img
                className="hover:scale-110 size-[300px] object-cover transition ease-in "
                src={item.image[0]}
                alt=""
              />
              <p className="pt-3 pb-1 text-sm">{item.name}</p>
              <p className="text-sm font-medium">
                {currency}
                {item.price}
              </p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default ProductItem;
