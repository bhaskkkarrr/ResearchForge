import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email should be unique"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  profileURL: { type: String, default: null },
  credits: {
    type: Number,
    default: 200,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
