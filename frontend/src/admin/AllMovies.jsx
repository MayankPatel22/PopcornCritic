import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AllMovies = () => {
  const { getTopMovies, movies, setEdit, backendUrl, search } =
    useContext(AppContext);
  const deleteMovie = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}api/admin/delete-movie/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("aToken")}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getTopMovies();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getTopMovies();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary text-center mb-6 tracking-wide">
        Admin Can Make Changes Here.
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {movies
          .filter((item) => {
            return search === ""
              ? true
              : item.title.toLowerCase().includes(search.toLowerCase()) ||
                  item.genre.toLowerCase().includes(search.toLowerCase());
          })
          .map((item, index) => (
            <div
              className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out hover:border-blue-300"
              key={index}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={item.poster}
                  alt={item.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  ⭐ {item.avgRating}
                </div>

                <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                  💬 {item.reviewCount} reviews
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  🎬 {item.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                    🎭 {item.genre}
                  </span>
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    📅 {item.year}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold flex items-center gap-1">
                    🌟 Starring
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-1 leading-relaxed font-medium">
                    {item.leads}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold flex items-center gap-1">
                    📖 Description
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      to={`/edit-movie/${item._id}`}
                      onClick={() => setEdit(true)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 text-sm font-medium rounded-lg transition-colors duration-200 hover:scale-105 transform"
                    >
                      ✏️ Edit
                    </Link>

                    <button
                      onClick={() => deleteMovie(item._id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors duration-200 hover:scale-105 transform"
                    >
                      🗑️ Delete
                    </button>

                    <Link
                      to={`/admin-reviews/${item._id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollTo(0, 0);
                      }}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition-colors duration-200 hover:scale-105 transform"
                    >
                      💬 Reviews
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllMovies;
