import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const delivery_fee = 10;
  const currency = "$";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addProduct = async (itemId, size) => {
    if (!size) {
      return toast.error("Select Preferred size");
    }

    const cartData = structuredClone(cartItems);

    //checks if the iten exits
    if (cartData[itemId]) {
      // if it exits, check if the size exits
      if (cartData[itemId][size]) {
        // increase the size + 1
        cartData[itemId][size] += 1;
      } else {
        // set the size = 1
        cartData[itemId][size] = 1;
      }
    } else {
      // if items does not exists at all, create a new object for the item
      cartData[itemId] = {};
      // set the size = 1
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items])
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  // useEffect(() => {
  // console.log(cartItems);

  // }, [cartItems])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.product);
        console.log(response.data);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    addProduct,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    delivery_fee,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
