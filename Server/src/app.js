import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import researchRouter from "./routes/research.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import config from "./config/config.js";
const app = express();
connectDB();
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRouter);
app.use("/api/research", researchRouter);

export default app;
