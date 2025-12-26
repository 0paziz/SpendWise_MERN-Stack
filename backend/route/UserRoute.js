const express= require("express")
const {Register,Login}=require("../controller/UserController")

const router= express.Router();

//register user : api/user/register
router.post("/register", Register)


//login user : api/user/login
router.post("/login",Login)

module.exports= router;