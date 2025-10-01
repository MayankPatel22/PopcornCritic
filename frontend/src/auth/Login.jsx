import React from "react";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl, setAToken, setToken } = useContext(AppContext);
  const onLoginHandler = async (event) => {
    event.preventDefault();

    const { data } = await axios.post(`${backendUrl}api/user/login`, {
      email,
      password,
    });
    if (data.success) {
      toast.success(data.message);
      if (data.role == "admin") {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
      }
      if (data.role == "critic") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      setEmail("");
      setPassword("");
    } else {
      toast.error(data.message);
    }
    navigate("/");
  };
  return (
    <form onSubmit={onLoginHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">Login</p>
        <p className="font-semibold">Please log in to continue</p>

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 my-2 rounded-md text-base"
        >
          Login
        </button>

        <p>
          Create a new account?{" "}
          <span
            onClick={() => navigate("/sign")}
            className="text-primary underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
