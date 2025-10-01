import React, { useContext, useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";

const Movies = () => {
  const { movies, getTopMovies, getFilteredMovie } = useContext(AppContext);
  const [filter, setFilters] = useState(false);
  const [genreFilter, setGenreFilter] = useState(false);
  const [yearFilter, setYearFilter] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const genres = [
    { name: "Action", emoji: "🎬" },
    { name: "Comedy", emoji: "😂" },
    { name: "Drama", emoji: "🎭" },
    { name: "Horror", emoji: "👻" },
    { name: "Romance", emoji: "❤️" },
    { name: "Sci-Fi", emoji: "🚀" },
    { name: "Thriller", emoji: "🔪" },
    { name: "Fantasy", emoji: "🧙‍♂️" },
  ];

  useEffect(() => {
    getTopMovies();
  }, []);

  useEffect(() => {
    if (selectedGenre || selectedYear || selectedRating) {
      const filters = {
        genre: selectedGenre,
        year: selectedYear,
        rating: selectedRating,
      };
      getFilteredMovie(filters);
    } else {
      getTopMovies();
    }
  }, [selectedGenre, selectedYear, selectedRating]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(selectedGenre === genre ? "" : genre);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(
      selectedRating === rating.toString() ? "" : rating.toString()
    );
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="flex flex-row gap-6 mt-5">
      <div className="w-1/4">
        <div className="flex flex-col gap-3">
          {!filter ? (
            <button
              onClick={() => setFilters(!filter)}
              className="flex flex-row items-center justify-center gap-2 border px-3 py-2 rounded transition-all w-full hover:bg-blue-200"
            >
              <CiCirclePlus className="text-xl" />
              <span className="text-base font-medium">Filters</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setGenreFilter(!genreFilter)}
                className="flex flex-row justify-center items-center gap-2 border px-4 py-3 rounded transition-all w-full hover:bg-blue-200"
              >
                <span>🎭</span> <span>Genre</span>
                {!genreFilter ? (
                  <CiCirclePlus className="text-lg" />
                ) : (
                  <CiCircleMinus className="text-lg" />
                )}
              </button>
              {genreFilter && (
                <div className="grid grid-cols-2 gap-3 w-full mt-3">
                  {genres.map((genre) => (
                    <button
                      key={genre.name}
                      onClick={() => handleGenreClick(genre.name)}
                      className={`flex items-center justify-center gap-2 border px-3 py-2 rounded-md text-sm transition-all w-full ${
                        selectedGenre === genre.name
                          ? "bg-blue-500 text-white border-blue-600 font-semibold"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {genre.emoji} {genre.name}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => setRatingFilter(!ratingFilter)}
                className="flex flex-row justify-center items-center gap-2 border px-4 py-3 rounded transition-all w-full mt-3 hover:bg-blue-200"
              >
                <span>⭐</span> <span>Rating</span>
                {!ratingFilter ? (
                  <CiCirclePlus className="text-lg" />
                ) : (
                  <CiCircleMinus className="text-lg" />
                )}
              </button>
              {ratingFilter && (
                <div className="grid grid-cols-3 gap-3 w-full mt-3">
                  {Array.from({ length: 6 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handleRatingClick(i)}
                      className={`flex items-center justify-center gap-2 border px-3 py-2 rounded-md text-sm transition-all w-full ${
                        selectedRating === i.toString()
                          ? "bg-yellow-400 text-black border-yellow-500 font-semibold"
                          : "hover:bg-yellow-100"
                      }`}
                    >
                      ⭐ {i}+
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setYearFilter(!yearFilter)}
                className="flex flex-row justify-center items-center gap-2 border px-4 py-3 rounded transition-all w-full mt-3 hover:bg-blue-200"
              >
                <span>
                  <SlCalender />
                </span>
                <span>Year</span>
                {!yearFilter ? (
                  <CiCirclePlus className="text-lg" />
                ) : (
                  <CiCircleMinus className="text-lg" />
                )}
              </button>
              {yearFilter && (
                <div className="w-full mt-3">
                  <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="w-full border rounded-md px-3 py-2 text-sm transition-all hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="">All Years</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              <button
                onClick={() => setFilters(!filter)}
                className="flex flex-row items-center justify-center gap-2 border px-4 py-3 rounded transition-all w-full mt-3 hover:bg-blue-200"
              >
                <CiCircleMinus className="text-lg" />
                <span>Close Filters</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="w-3/4">
        <div className="flex flex-wrap gap-6">
          {movies.length === 0 ? (
            <div className="w-full text-center py-20">
              <p className="text-gray-500 text-2xl mb-2">😔 No movies found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            movies.map((item, index) => (
              <Link
                to={`/detail/${item._id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                key={index}
                className="border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2 overflow-hidden w-80 bg-white group"
              >
                <img
                  src={item.poster}
                  alt={item.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-60"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                      🎬 {item.title}
                    </h2>
                    <span className="bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full shadow-md flex-shrink-0">
                      ⭐ {item.avgRating}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm flex items-center">
                      🎭{" "}
                      <span className="bg-blue-100 text-blue-800 px-3 ml-2 py-1 rounded-full font-medium">
                        {item.genre}
                      </span>
                    </p>
                    <p className="text-gray-600 text-sm flex items-center">
                      📅 <span className="font-medium ml-2">{item.year}</span>
                    </p>
                    <p className="text-gray-600 text-sm flex items-center">
                      🌟{" "}
                      <span className="font-medium ml-1 line-clamp-1">
                        {item.leads}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {movies.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            Showing {movies.length} movie{movies.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
