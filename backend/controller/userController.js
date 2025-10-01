import movieModel from "../model/movieModel.js";
import reviewModel from "../model/reviewModel.js";
import mongoose from "mongoose";
export const postUserReviews = async (req, res) => {
  try {
    const { review, rating } = req.body;
    const movieId = req.params.id;
    const userId = req.user.id;

    if (!review || !rating) {
      return res
        .status(400)
        .json({ message: "Review and rating are required" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const newReview = await reviewModel.create({
      movie: movieId, 
      user: userId,
      rating: Number(rating),
      comment: review,
    });

    movie.reviewCount = (movie.reviewCount || 0) + 1;
    movie.avgRating =
      (movie.avgRating * (movie.reviewCount - 1) + Number(rating)) /
      movie.reviewCount;
    movie.avgRating = Number(movie.avgRating.toFixed(1));

    await movie.save();

    console.log("Review saved successfully:", newReview);

    res.status(201).json({ success: true, newReview });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
export const getAllReviews = async (req, res) => {
  try {
    const movieId = req.params.id;

    const reviews = await reviewModel
      .find({ movie: movieId })
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 });
    const cleanedReviews = reviews.map((r) => ({
      _id: r._id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt, 
      user: r.user
        ? { name: `${r.user.firstName} ${r.user.lastName || ""}`.trim() }
        : { name: "Unknown User" },
    }));

    res.json({ success: true, message: "Reviews Found", cleanedReviews });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
export const getFilterMovie = async (req, res) => {
  try {
    const { genre, year, rating } = req.query;
    let query = {};
    if (genre) {
      query.genre = genre;
    }
    if (year) {
      query.year = Number(year);
    }
    if (rating) {
      query.avgRating = { $gte: Number(rating) };
    }
    const movies = await movieModel
      .find(query)
      .sort({ avgRating: -1, createdAt: -1 });
    res.json({ success: true, movies });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
