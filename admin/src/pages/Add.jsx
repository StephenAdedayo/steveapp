import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {headers : {token}}
      );
      console.log(response.data.success);

      if (response.data.success) {
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  return (
    <main className="">
      <form onSubmit={onSubmitHandler} action="">
        <h1 className="mb-3">Upload Image</h1>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              id="image1"
              type="file"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <p>Product Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type here"
              className="outline-none border pl-3 py-2 rounded-lg border-gray-300 w-full max-w-[500px]"
              type="text"
              name=""
              id="name"
              required
            />
          </div>

          <div className="space-y-2">
            <p>Product Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type here"
              className="outline-none border pl-3 py-2 rounded-lg border-gray-300 w-full max-w-[500px]"
              type="text"
              name=""
              id="description"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-4">
              <p>Product Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full max-w-[150px] outline-0 border border-gray-300 rounded-lg py-2"
                name=""
                id="category"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="space-y-4">
              <p>Subcategory</p>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full max-w-[150px] outline-0 border border-gray-300 rounded-lg py-2"
                name=""
                id="subCategory"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div className="space-y-4">
              <p>Product price</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="25"
                required
                id="price"
                className="w-full pl-2 max-w-[150px] outline-0 border border-gray-300 rounded-lg py-2"
              />
            </div>
          </div>

          <div>
            <p className="mb-4">Select Sizes</p>
            <div className="flex gap-2">
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("S") ? "bg-black text-white" : "bg-slate-200"
                  } px-3 py-1`}
                >
                  S
                </p>
              </div>

              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("M") ? "bg-black text-white" : "bg-slate-200"
                  } px-3 py-1`}
                >
                  M
                </p>
              </div>

              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("L") ? "bg-black text-white" : "bg-slate-200"
                  } px-3 py-1`}
                >
                  L
                </p>
              </div>

              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("XL")
                      ? "bg-black text-white"
                      : "bg-slate-200"
                  } px-3 py-1`}
                >
                  XL
                </p>
              </div>

              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XXL")
                      ? prev.filter((item) => item !== "XXL")
                      : [...prev, "XXL"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("XXL")
                      ? "bg-black text-white"
                      : "bg-slate-200"
                  } px-3 py-1`}
                >
                  XXL
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              onChange={() => setBestSeller((prev) => !prev)}
              type="checkbox"
              checked={bestSeller}
              id="bestSeller"
            />
            <label htmlFor="bestSeller">Add to Bestseller</label>
          </div>
        </div>
        <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
          ADD
        </button>
      </form>
    </main>
  );
};

export default Add;
