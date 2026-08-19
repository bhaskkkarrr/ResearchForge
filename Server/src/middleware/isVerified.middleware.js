import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../model/user.model.js";
const isVerified = async (req, res, next) => {
  let authHeader;
  let token;

  if (req.headers.Authorization || req.headers.authorization) {
    authHeader = req.headers.Authorization || req.headers.authorization;
  } else {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }

  if (authHeader.split(" ")[0] == "Bearer") {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log("Decoded", decoded);
    const user = await User.findById(decoded.id)
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Invalid token"
      })
    }
    req.user = user;
  } catch (ersror) {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }
  next();
};

export default isVerified;
