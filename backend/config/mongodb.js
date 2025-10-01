import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );

    const mongoUri =
      process.env.NODE_ENV === "production"
        ? `${process.env.MONGODB_URI}/Mogi`
        : `${process.env.MONGODB_URI}/Mogi`;

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
