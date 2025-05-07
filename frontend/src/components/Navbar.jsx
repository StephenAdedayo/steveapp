import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { setShowSearch, navigate, getCartCount, token, setToken } =
    useContext(ShopContext);

    // function for logging out a user by removing the stored token
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  const [hover, setHover] = useState(false)

  const openSearchBar = () => {
    navigate("/collection");
    setShowSearch(true);
  };

  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setHover(false)
  }, [location]);

  return (
    <>
      <nav className="px-5 py-8 lg:px-40 flex justify-between items-center">
        <div>
          <img src={assets.logo} alt="" className="w-[150px]" />
        </div>

        <div className="lg:flex hidden gap-10">
          <NavLink to={"/"} className={"flex flex-col items-center"}>
            <p className="uppercase text-base">Home</p>
            <hr className="bg-gray-700 w-2/4 border-none hidden h-[1.5px]" />
          </NavLink>

          <NavLink to={"/collection"} className={"flex flex-col items-center"}>
            <p className="uppercase text-base">Collection</p>
            <hr className="bg-gray-700 w-2/4 border-none hidden h-[1.5px]" />
          </NavLink>

          <NavLink to={"/about"} className={"flex flex-col items-center"}>
            <p className="uppercase text-base">About</p>
            <hr className="bg-gray-700 w-2/4 border-none hidden h-[1.5px]" />
          </NavLink>

          <NavLink to={"/contact"} className={"flex flex-col items-center"}>
            <p className="uppercase text-base">Contact</p>
            <hr className="bg-gray-700 w-2/4 border-none hidden h-[1.5px]" />
          </NavLink>
        </div>

        <div className="flex gap-5">
          <img
            className="size-5"
            onClick={openSearchBar}
            src={assets.search_icon}
            alt=""
          />

          <div className="relative">
            <img
              onClick={() => (token ? null || setHover(!hover): navigate("/login"))}
              // onClick={} 
              className="size-5"
              src={assets.profile_icon}
              alt=""
            />

            {token && (
              <div  className="pt-4">
                <div  className={`${hover ? 'opacity-100' : "opacity-0"}  absolute right-0 bg-black text-gray-400 rounded-lg px-4 py-4  `}>
                  <p>Profile</p>
                  <p onClick={() => navigate('/orders')}>Orders</p>
                  <div className="">
                    <p onClick={logout}>Logout </p>

                    {/* <img className='' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTFwjKF-FfgpcOEppsg9ezUYxhyW8mxcrQQ&s" alt="" /> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <img
              onClick={() => navigate("/cart")}
              className="size-5"
              src={assets.cart_icon}
              alt=""
            />
            <p className="bg-black text-[12px] absolute top-3 left-2 p-1 rounded-full text-white size-4 flex items-center justify-center">
              {getCartCount()}
            </p>
          </div>
          <img
            className="size-5 lg:hidden block"
            src={assets.menu_icon}
            alt=""
            onClick={() => setMenuOpen(!isMenuOpen)}
          />
        </div>
      </nav>

      {/* smaller screens */}

      <div
        onClick={() => setMenuOpen(false)}
        className={`${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } h-full right-0 left-0  top-0 w-full fixed bg-gray-400/40  backdrop-blur-xl`}
      ></div>

      <nav
        className={`${
          isMenuOpen ? "w-[70%]" : "w-0 pointer-events-none"
        } overflow-hidden lg:hidden block z-50 transition-all duration-300 delay-75 ease-in bg-white fixed top-0 right-0 bottom-0  pt-3`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className="flex px-5 items-center gap-3"
        >
          <img src={assets.dropdown_icon} className="-rotate-180 w-2" alt="" />
          <p>Back</p>
        </div>

        <div className="flex flex-col mt-2">
          <NavLink to={"/"} className={"py-2 uppercase border-b pl-6"}>
            Home
          </NavLink>

          <NavLink
            to={"/collection"}
            className={"py-2 uppercase border-b pl-6"}
          >
            Collection
          </NavLink>

          <NavLink to={"/about"} className={"py-2 uppercase border-b pl-6"}>
            About
          </NavLink>

          <NavLink to={"/contact"} className={"py-2 uppercase border-b pl-6"}>
            Contact
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
