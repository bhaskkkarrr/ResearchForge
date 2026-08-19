import mongoose from "mongoose";
import config from "./config.js";
export const connectDB = async () => {
  try {
    mongoose.connect(config.MONGODB_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error while connecting to database", error);
  }
};
