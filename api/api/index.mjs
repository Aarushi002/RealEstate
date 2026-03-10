import * as authRouterModule from "../routes/auth.route.mjs";
import * as userRouterModule from "../routes/user.route.js";
import * as listingRouterModule from "../routes/listing.route.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const authRouter = authRouterModule.default || authRouterModule;
const userRouter = userRouterModule.default || userRouterModule;
const listingRouter = listingRouterModule.default || listingRouterModule;

app.use(express.json());
app.use(cookieParser());

const url = process.env.MONGO;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
