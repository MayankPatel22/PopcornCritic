import express from "express";
import {
  postAddMovie,
  getTopMovies,
  postEditMovie,
  deleteMovie,
  getAdminReviews,
  deleteReviews,
} from "../controller/adminController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/authVerify.js";
const adminRouter = express.Router();

adminRouter.post("/add-movie", upload.single("poster"), postAddMovie);
adminRouter.get("/movies", getTopMovies);
adminRouter.put("/edit-movie/:id", upload.single("poster"), postEditMovie);
adminRouter.delete("/delete-movie/:id", deleteMovie);
adminRouter.get("/all-reviews/:id", verifyToken, getAdminReviews);
adminRouter.delete("/delete-review/:id", verifyToken, deleteReviews);

export default adminRouter;
