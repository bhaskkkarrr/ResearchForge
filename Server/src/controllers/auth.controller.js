import User from "../model/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cloudinary from "../services/cloudinaryConfig.js";
import { resolve } from "dns";
import { rejects } from "assert";
import { error } from "console";

export const createSession = async (req, res) => {
  const { email, username, profileURL } = req.body;

  if (!email || !username) {
    return res.status(400).json({
      success: false,
      message: "Information is required",
    });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    const refreshToken = jwt.sign({ id: isUser._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const accessToken = jwt.sign({ id: isUser._id }, config.JWT_SECRET, {
      expiresIn: "10m",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successful",
      user: isUser,
      token: accessToken,
    });
  } else {
    var url = null;
    if (profileURL) {
      const cloudinaryResponse = await cloudinary.uploader.upload(profileURL, {
        folder: "profile-images",
      });
      url = cloudinaryResponse.secure_url;
    }

    const user = await User.create({
      email,
      username,
      profileURL: url,
    });

    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "10m",
    });

    return res.status(201).json({
      success: true,
      message: "User created",
      user,
      token: accessToken,
    });
  }
};

export const getAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "No token found, access denied",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  const newAccessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "10min",
  });

  const newRefreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 * 7,
  });

  return res.status(200).json({
    success: true,
    message: "Token generated",
    user,
    token: newAccessToken,
  });
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(402).json({
      success: false,
      message: "Token not found. Access denied",
    });
  }
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
