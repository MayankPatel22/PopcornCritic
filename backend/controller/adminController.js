import movieModel from "../model/movieModel.js";
import reviewModel from "../model/reviewModel.js";
import { v2 as cloudinary } from "cloudinary";
export const postAddMovie = async (req, res) => {
  try {
    const { title, genre, year, description, leads } = req.body;
    const imageFile = req.file;

    if (!title || !genre || !year || !description || !leads) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!imageFile) {
      return res.json({ success: false, message: "Poster image is required" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "movies",
      resource_type: "image",
    });

    const movieData = {
      title,
      genre,
      year,
      poster: imageUpload.secure_url,
      description,
      leads,
    };

    const newMovie = new movieModel(movieData);
    await newMovie.save();

    res.json({ success: true, message: "Movie Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getTopMovies = async (req, res) => {
  try {
    const movies = await movieModel.find({}).sort({ avgRating: -1 });
    res.json({ success: true, movies });
  } catch (error) {
    res.json({ success: false, message: "Cann't Fetch Movies" });
  }
};
export const postEditMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, genre, year, description, leads } = req.body;
    const imageFile = req.file;

    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.json({ success: false, message: "Movie Not Found" });
    }
    if (imageFile) {
      const oldPublicId = movie.poster.split("/").slice(-1)[0].split(".")[0];

      await cloudinary.uploader.destroy(`movies/${oldPublicId}`);
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "movies",
        resource_type: "image",
      });
      movie.poster = imageUpload.secure_url;
    }
    if (title) movie.title = title;
    if (genre) movie.genre = genre;
    if (year) movie.year = year;
    if (description) movie.description = description;
    if (leads) movie.leads = leads;

    await movie.save();

    res.json({
      success: true,
      message: "Movie updated successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!movieId) {
      return res.json({ success: false, message: "Movie ID is required" });
    }
    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.json({ success: false, message: "Movie Not Found" });
    }
    await movieModel.findByIdAndDelete(movieId);
    return res.json({ success: true, message: "Movie Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getAdminReviews = async (req, res) => {
  try {
    const movieId = req.params.id;
    const reviews = await reviewModel
      .find({ movie: movieId })
      .populate("user", "firstName lastName");
    const cleanedReviews = reviews.map((r) => ({
      _id: r._id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      user: r.user
        ? { name: `${r.user.firstName} ${r.user.lastname || ""}`.trim() }
        : { name: "Unknown User" },
    }));

    res.json({ success: true, message: "Reviews Fetched", cleanedReviews });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
export const deleteReviews = async (req, res) => {
  try {
    const reviewId = req.params.id;

    if (!reviewId)
      return res.json({ success: false, message: "Review Not Found" });

    await reviewModel.findByIdAndDelete(reviewId);
    res.json({ success: true, message: "Review Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
