import express from "express";
import { postSignUp, getLoginInfo } from "../controller/authController.js";
import {
  postUserReviews,
  getAllReviews,
  getFilterMovie,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/authVerify.js";
const userRouter = express.Router();

userRouter.post("/signup", postSignUp);
userRouter.post("/login", getLoginInfo);
userRouter.post("/add-review/:id", verifyToken, postUserReviews);
userRouter.get("/all-reviews/:id", verifyToken, getAllReviews);
userRouter.get("/filter-movie", verifyToken, getFilterMovie);

export default userRouter;
