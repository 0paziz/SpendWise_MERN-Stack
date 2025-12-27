const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");

const UserRoute = require("../route/UserRoute");
const TransectionRoute = require("../route/TransectionRoute");

const app = express();

// middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// ✅ Serverless-safe MongoDB connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// ✅ Ensure DB before handling routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// ✅ Root test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.json({ status: "Backend running on Vercel" });
});

// routes
app.use("/api/auth", UserRoute);
app.use("/api/transections", TransectionRoute);


module.exports = app;
