import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(`${backendUrl}api/user/signup`, {
      firstName,
      lastName,
      email,
      password,
      userType,
    });
    if (data.success) {
      toast.success(data.message);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setUserType("");
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-[500px] border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white">
        <p className="text-2xl font-semibold">Create Your Account</p>
        <p className="font-semibold">Please fill the details to sign up</p>

        <div className="flex gap-4 w-full">
          <div className="flex-1">
            <p>First Name</p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              placeholder="John"
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              required
            />
          </div>
          <div className="flex-1">
            <p>Last Name</p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              placeholder="Doe"
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
            />
          </div>
        </div>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="your.email@example.com"
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
            placeholder="Enter your password"
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>
        <div className="w-full p-3 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">
            I want to register as:
          </p>
          <div className="flex space-x-6">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="critic"
                checked={userType === "critic"}
                onChange={(e) => setUserType(e.target.value)}
                required
              />
              <span className="ml-2">Critic</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={userType === "admin"}
                onChange={(e) => setUserType(e.target.value)}
                required
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
        </div>
        <div className="w-full">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" name="terms" required />
            <span className="ml-2 text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                terms and conditions
              </a>
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 my-2 rounded-md text-base hover:bg-primary transition"
        >
          Register
        </button>
        <p>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary underline cursor-pointer"
          >
            Log in
          </button>
        </p>
      </div>
    </form>
  );
};

export default Signup;
