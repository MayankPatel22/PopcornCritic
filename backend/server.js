import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoutes from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
connectDB();
connectCloudinary();
const PORT = process.env.PORT || 3001;

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("Server is up and running!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
