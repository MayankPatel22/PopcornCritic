import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <img
        src={assets.home}
        alt=""
        className="w-full max-w-none h-[75vh] object-cover"
      />

      <div className="absolute">
        <button
          onClick={() => navigate("/reviews")}
          className="mt-11 bg-orange-500 text-white px-8 py-3 rounded-full font-semibold 
               shadow-lg hover:bg-white hover:text-orange-600 hover:scale-105 
               transition-all duration-300"
        >
          🎬 Explore Reviews
        </button>
      </div>
    </div>
  );
};

export default Header;
