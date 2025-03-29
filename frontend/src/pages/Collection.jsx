import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Text from "../components/Text";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState([]);

  // adds category inside the category array
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // same as category
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // checks if the category array has more than 1 item then filter products based on whatever category is clicked on
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilteredProducts(productCopy);
  };

  const sortOption = () => {
    const fpCopy = filteredProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, search, showSearch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    sortOption();
  }, [sortType]);

  return (
    <div className="w-full flex lg:flex-row flex-col gap-10 mt-10 ">
      <div className="flex-[20%]">
        <div className="flex gap-3 items-center">
          <p>FILTER</p>
          <img
            onClick={() => setShowFilter(!showFilter)}
            src={assets.dropdown_icon}
            className={`w-3 lg:hidden block ${
              showFilter ? "rotate-90" : ""
            } transition-transform duration-300 delay-75 ease-in `}
            alt=""
          />
        </div>

        <div className={`mt-10 lg:block  ${showFilter ? "" : "hidden"}`}>
          <div className="border p-3  mb-5 border-gray-300">
            <p className="uppercase mb-5">categories</p>
            <div className="flex flex-col font-light text-base">
              <div className="inline-flex  items-center gap-2">
                <input
                  onChange={toggleCategory}
                  type="checkbox"
                  value={"Men"}
                />
                <label htmlFor="">Men</label>
              </div>

              <div className="inline-flex items-center gap-2">
                <input
                  onChange={toggleCategory}
                  type="checkbox"
                  value={"Women"}
                />
                <label htmlFor="">Women</label>
              </div>

              <div className="inline-flex items-center gap-2">
                <input
                  onChange={toggleCategory}
                  type="checkbox"
                  value={"Kids"}
                />
                <label htmlFor="">Kids</label>
              </div>
            </div>
          </div>

          <div className="border p-3   border-gray-300">
            <p className="uppercase mb-5">type</p>
            <div className="flex flex-col font-light text-base">
              <div className="inline-flex  items-center gap-2">
                <input
                  onChange={toggleSubCategory}
                  type="checkbox"
                  value={"Topwear"}
                />
                <label htmlFor="">Topwear</label>
              </div>

              <div className="inline-flex items-center gap-2">
                <input
                  onChange={toggleSubCategory}
                  type="checkbox"
                  value={"Bottomwear"}
                />
                <label htmlFor="">Bottomwear</label>
              </div>

              <div className="inline-flex items-center gap-2">
                <input
                  onChange={toggleSubCategory}
                  type="checkbox"
                  value={"Winterwear"}
                />
                <label htmlFor="">Winterwear</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-[80%]">
        <div className=" flex justify-between">
          <Text text1={"all"} text2={"collections"} />
          <div>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="p-2 border border-gray-300 outline-0"
              name=""
              id=""
            >
              <option value="relevant">sort by relevant</option>
              <option value="low-high">low to high</option>
              <option value="high-low">high to low</option>
            </select>
          </div>
        </div>

        <div className="mt-10">
          <ProductItem products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Collection;
