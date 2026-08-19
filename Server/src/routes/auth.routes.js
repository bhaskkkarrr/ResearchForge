import express from "express";
import * as authController from "../controllers/auth.controller.js";
import isVerified from "../middleware/isVerified.middleware.js";
const authRouter = express.Router();

authRouter.post("/create-session", authController.createSession);
authRouter.get("/logout", isVerified, authController.logout);
authRouter.get("/get-access-token", authController.getAccessToken);
export default authRouter;
