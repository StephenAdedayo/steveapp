import React, { useContext, useEffect, useState } from "react";
import Text from "../components/Text";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [current, setCurrent] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (current === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/users/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/users/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="grid place-items-center w-full ">
      <h1 className="mt-10">
        <Text text2={current} />
      </h1>

      <form
        onSubmit={onSubmitHandler}
        action=""
        className="w-full sm:w-[450px] mt-10 "
      >
        <div className="space-y-4">
          {current === "Login" ? (
            <></>
          ) : (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-500 pl-2 outline-0 py-2 w-full"
              type="text"
              placeholder="Name"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-500 pl-2 outline-0 py-2 w-full"
            type="email"
            placeholder="Email"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-500 pl-2 outline-0 py-2 w-full"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-[14px]">Forgot your password?</p>
          {current === "Login" ? (
            <p className="text-[14px]" onClick={() => setCurrent("Sign Up")}>
              Create Account
            </p>
          ) : (
            <p className="text-[14px]" onClick={() => setCurrent("Login")}>
              Login here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="block mx-auto bg-black text-white py-2 px-4 mt-3"
        >
          {current === "Login" ? "Sign-in" : "Sign-up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
