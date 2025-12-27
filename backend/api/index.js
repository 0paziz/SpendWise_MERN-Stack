const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");

const UserRoute = require("../route/UserRoute");
const TransectionRoute = require("../route/TransectionRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// MongoDB connection (Render-friendly)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

// test route
app.get("/", (req, res) => {
  res.json({ status: "Backend running on Render" });
});

// routes
app.use("/api/auth", UserRoute);
app.use("/api/transections", TransectionRoute);

// 🚀 REQUIRED for Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
