import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI not found in the environment variables");
}

if (!process.env.AI_BACKEND_URL) {
  throw new Error("AI_BACKEND_URL not found in the environment variables");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not found in the environment variables");
}
if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL not found in the environment variables");
}
if (
  !process.env.CLOUDINARY_API_SECRET ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_NAME
) {
  throw new Error("Not enough environment variables found for cloudinary");
}

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  AI_BACKEND_URL: process.env.AI_BACKEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
};

export default config;
