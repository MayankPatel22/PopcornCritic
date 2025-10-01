import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import RelatedMovie from "../components/RelatedMovie";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { movies, getTopMovies } = useContext(AppContext);

  const detailMovie = movies.find((res) => res._id === id);
  if (!detailMovie) {
    toast.error("Details Not Found");
  }
  console.log(detailMovie);
  useEffect(() => {
    getTopMovies();
  }, []);
  return (
    <div className="min-h-scree px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Movies
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex items-center justify-center">
              <div className="relative group">
                <img
                  src={detailMovie?.poster}
                  alt={detailMovie?.title}
                  className="w-full max-w-md rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-lg font-bold shadow-lg flex items-center gap-2">
                  ⭐ {detailMovie?.avgRating}
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                    🎬 {detailMovie?.title}
                  </h1>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-lg flex items-center gap-2">
                    🎭 {detailMovie?.genre}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold text-lg flex items-center gap-2">
                    📅 {detailMovie?.year}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">💬</span>
                  <span className="text-lg font-medium">
                    {detailMovie?.reviewCount.toLocaleString()} Reviews
                  </span>
                </div>

                <div className="space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-2">
                    🌟 Starring
                  </p>
                  <p className="text-gray-800 text-lg font-medium leading-relaxed">
                    {detailMovie?.leads}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-2">
                    📖 Description
                  </p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {detailMovie?.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate(`review/${detailMovie._id}`)}
                  className="w-full bg-primary hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  <span className="text-2xl">💬</span>
                  View All Reviews
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedMovie id={id} genre={detailMovie?.genre} />
    </div>
  );
};

export default Detail;
