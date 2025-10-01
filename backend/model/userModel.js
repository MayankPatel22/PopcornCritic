import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["critic", "admin"],
    default: "critic",
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
