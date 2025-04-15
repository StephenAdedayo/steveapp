import React, { useContext } from "react";
import Text from "./Text";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div>
      <div className="mb-5">
        <Text text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="space-y-3">
        <div className="border-b border-b-gray-300 py-2 flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount().toFixed(2)}
          </p>
        </div>

        <div className="border-b border-b-gray-300 py-2 flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee.toFixed(2)}
          </p>
        </div>

        <div className="border-b border-b-gray-300 py-2 flex justify-between">
          <p>Total</p>
          <p>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
