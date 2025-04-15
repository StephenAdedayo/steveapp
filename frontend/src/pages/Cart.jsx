import React, { useContext, useEffect, useState } from "react";
import CartTotal from "../components/CartTotal";
import Text from "../components/Text";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    //  checks if the product has been loaded or not to avoid running logic when it's empty or still fetching

    if (products.length > 0) {
      // creating an array from the objects

      const tempData = [];
      // loops through each product in the cartItems

      for (const items in cartItems) {
        // loops through each size inside that product

        for (const item in cartItems[items]) {
          // if quantity > 0 then add that product
          // Only do something if the user has at least 1 of this size of this product in the cart"
          if (cartItems[items][item] > 0) {
            tempData.push({
              // the product
              _id: items,
              // the size
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="w-full ">
      <div className="my-10">
        <Text text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          // finding the product added to the tempData
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 w-full flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <img className="w-[100px]" src={productData.image[0]} alt="" />
                <div>
                  <p>{productData.category}</p>
                  <div className="flex items-center gap-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p>{item.size}</p>
                  </div>
                </div>
              </div>

              <div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  type="number"
                  className="outline-0 border border-gray-400 px-2 py-1 w-[50px]"
                  min={1}
                  defaultValue={item.quantity}
                />
              </div>

              <div>
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-[30px]"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[400px]">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Cart;
