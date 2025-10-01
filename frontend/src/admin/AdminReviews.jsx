import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const AdminReviews = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { movies, getTopMovies, getAllReviewAdmin, allReview, backendUrl } =
    useContext(AppContext);
  const reviewMovie = movies.find((mov) => mov._id === movieId);
  console.log("Movie id admin", movieId);
  const handleDeleteReview = async (reviewId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}api/admin/delete-review/${reviewId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("aToken")}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllReviewAdmin(movieId);
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
  useEffect(() => {
    if (movieId) getAllReviewAdmin(movieId);
  }, [movieId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          ← Back to Details
        </button>

        <div className="flex justify-center items-center mb-8">
          <div className="bg-white rounded-2xl justify-center shadow-lg p-6 flex items-center gap-6 w-full max-w-3xl">
            <img
              src={reviewMovie?.poster}
              alt={reviewMovie?.title}
              className="w-24 h-36 object-cover rounded-lg shadow-md"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                {reviewMovie?.title}
              </h1>
              <div className="flex items-center gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {reviewMovie?.avgRating?.toFixed(1)}
                  </span>
                  <span className="text-gray-500">/ 5</span>
                </div>
                <div className="text-gray-600">
                  💬 {reviewMovie?.reviewCount || 0} Reviews
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {!allReview || allReview.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">
                No User Have Reviewed This Movie Yet!
              </p>
            </div>
          ) : (
            allReview.map((review) => (
              <div
                key={review._id}
                className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {review.user.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                    ⭐ <span className="text-gray-900">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {review.comment}
                </p>

                <MdDelete
                  className="absolute bottom-3 right-3 text-red-500 cursor-pointer hover:text-red-700 h-7 w-7"
                  size={22}
                  onClick={() => handleDeleteReview(review._id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
