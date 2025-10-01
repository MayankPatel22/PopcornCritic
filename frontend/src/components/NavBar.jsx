import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const [find, setFind] = useState(false);
  const navigate = useNavigate();
  const { aToken, token, setAToken, setToken, setSearch } =
    useContext(AppContext);
  const logOut = () => {
    setAToken(null);
    setToken(null);
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-b-[#ADADAD] sticky top-0 bg-white z-50 px-4 sm:px-10">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="cursor-pointer w-36 sm:w-40"
      />
      <ul className="hidden md:flex items-center gap-8 font-medium text-lg text-gray-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-black" : "hover:text-black"
          }
        >
          Home
        </NavLink>
        {aToken ? (
          <>
            <NavLink
              to="/admin-movie"
              className={({ isActive }) =>
                isActive ? "text-black" : "hover:text-black"
              }
            >
              Movies
            </NavLink>

            <NavLink
              to="/add-movie"
              className={({ isActive }) =>
                isActive ? "text-black" : "hover:text-black"
              }
            >
              Add Movies
            </NavLink>
          </>
        ) : null}
        {token ? (
          <>
            <NavLink
              to="/user-movies"
              className={({ isActive }) =>
                isActive ? "text-black" : "hover:text-black"
              }
            >
              Movies
            </NavLink>
          </>
        ) : null}
      </ul>
      <div className="flex items-center gap-6">
        {aToken || token ? (
          <div className="flex items-center gap-6">
            {!find ? (
              <img
                onClick={() => setFind(true)}
                src={assets.search}
                alt="Search"
                className="cursor-pointer w-8 h-8"
              />
            ) : (
              <div className="flex justify-center mr-2">
                <div className="relative w-full max-w-md">
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
              </div>
            )}
            <img
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              src={assets.upload_area}
              alt="profile"
            />
            <div className="group relative">
              <img
                className="w-4 cursor-pointer"
                src={assets.dropdown_icon}
                alt="dropdown"
              />
              <div className="absolute top-0 right-0 pt-12 z-20 hidden group-hover:block">
                <div className="min-w-44 bg-white rounded-xl shadow-lg flex flex-col p-3 border border-gray-200 animate-fadeIn">
                  <p
                    onClick={logOut}
                    className="px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-red-500 cursor-pointer transition"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition"
          >
            Create account
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
