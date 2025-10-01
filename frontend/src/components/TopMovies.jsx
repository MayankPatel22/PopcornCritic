import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const TopMovies = () => {
  const { getTopMovies, movies, search } = useContext(AppContext);

  useEffect(() => {
    getTopMovies();
  }, []);
  return (
    <div>
      <h1 className="text-center text-2xl mt-5">Some Top Rated Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
        {movies
          .filter((item) => {
            return search === ""
              ? true
              : item.title.toLowerCase().includes(search.toLowerCase()) ||
                  item.genre.toLowerCase().includes(search.toLowerCase());
          })
          .slice(0, 10)
          .map((item, index) => (
            <Link
              to={`/detail/${item._id}`}
              className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out hover:border-blue-300"
              key={index}
              onClick={() => {
                scrollTo(0, 0);
              }}
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
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  🎬 {item.title}
                </h3>

                <div className="flex items-center justify-between text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {item.genre} 🍿
                  </span>
                  <span className="text-gray-500 font-medium">
                    📅 {item.year}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    🎭 Starring
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
                    {item.leads}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TopMovies;
