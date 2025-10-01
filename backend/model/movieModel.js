import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    year: { type: Number },
    poster: { type: String, required: true },
    description: { type: String, required: true },
    leads: { type: String, required: true },
    avgRating: { type: Number, default: 4 },
    reviewCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const movieModel = mongoose.model("Movie", movieSchema);
export default movieModel;
