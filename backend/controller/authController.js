import userModel from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postSignUp = async (req, res) => {
  console.log("You are here");
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    if (!firstName || !lastName || !email || !password || !userType) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "Email already registered. Please login",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length <= 4) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const signData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: userType,
    };
    const newUser = new userModel(signData);
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "Redirecting to login page" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const getLoginInfo = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        Message: "User Doesn't Exist Please Signup.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, Message: "Enter correct password" });
    }
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({ success: true, token, role: user.role });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
