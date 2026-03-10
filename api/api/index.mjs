import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "../routes/auth.route.mjs";
import userRouter from "../routes/user.route.mjs";
import listingRouter from "../routes/listing.route.mjs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const url = process.env.MONGO;

if (!url) {
  throw new Error("MONGO environment variable is missing");
}

await mongoose.connect(url);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
