const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose= require("mongoose")
const express= require("express");
const UserRoute = require("./route/UserRoute");
const TransectionRoute = require("./route/TransectionRoute");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5174";
const app= express();
const PORT=process.env.PORT || 5000;

//middle ware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json())


//mongo DB Connection Set
mongoose.connect(process.env.MONGO_URI)
    .then(()=>app.listen(PORT,()=>{
    console.log("Listening on Port:",PORT);
    console.log("Api is ready ");
    }))
    .catch(Error=>{console.log("MongoDB failed to connect error:", Error)} );

//using routers
app.use("/api/auth",UserRoute)
app.use("/api/transections",TransectionRoute);







