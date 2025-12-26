const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");

const UserRoute = require("./route/UserRoute");
const TransectionRoute = require("./route/TransectionRoute");

const FRONTEND_URL = process.env.FRONTEND_URL

const app = express();

// middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// MongoDB connection (IMPORTANT FIX)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
}

connectDB().catch(err =>
  console.error("MongoDB connection failed:", err)
);

// routes
app.use("/api/auth", UserRoute);
app.use("/api/transections", TransectionRoute);


// ✅ EXPORT app for Vercel
module.exports = app;
