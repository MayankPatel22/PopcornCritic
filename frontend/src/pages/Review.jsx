import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Review = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { movies, backendUrl, getTopMovies, getAllReview, allReview } =
    useContext(AppContext);
  const reviewMovie = movies.find((mov) => mov._id === movieId);

  const resetReview = () => {
    setRating("");
    setReview("");
    getTopMovies();
  };
  useEffect(() => {
    getTopMovies();
  }, []);
  useEffect(() => {
    getAllReview(movieId);
  }, [movieId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}api/user/add-review/${reviewMovie._id}`,
        {
          review,
          rating,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        toast.success("Review submitted successfully!");
        resetReview();
        getAllReview(movieId);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          ← Back to Details
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center gap-6">
          <img
            src={reviewMovie?.poster}
            alt={reviewMovie?.title}
            className="w-24 h-36 object-cover rounded-lg shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {reviewMovie?.title}
            </h1>
            <div className="flex items-center gap-4">
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

        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            ✍️ Write a Review
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8/12">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                  placeholder="Share your thoughts..."
                  rows="3"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  required
                />
              </div>

              <div className="w-4/12 h-10 bg-white rounded-2xl shadow-lg p-3 flex flex-col items-center justify-center mt-10">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-3xl">
                      ★
                    </span>
                  ))}
                </div>

                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Enter Rating (1-5)
                  </label>
                  <input
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    type="number"
                    min="1"
                    max="5"
                    placeholder="e.g 4"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2"
            >
              📝 Submit Review
            </button>
          </form>
        </div>
        <div className="space-y-6">
          {!allReview || allReview.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">
                No reviews yet. Be the first to review!
              </p>
            </div>
          ) : (
            allReview.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
