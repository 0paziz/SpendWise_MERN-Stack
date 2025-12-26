const User= require("../models/UserModel")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken");

const JWT_SECRET= process.env.JWT_SECRET;

function GenerateJWT(userid,useremail){
   return jwt.sign({id:userid, email:useremail},JWT_SECRET,{expiresIn:"7d"})
}

async function Register(req,res) {
    try{
        const{name, email, password}= req.body
        //Validation
        if (!name || !email || !password) return res.status(400).json({message:"missing fields"});

        //look through data base and find if registered email is exist
        const existEmail= await User.findOne({email});
        if (existEmail) return res.status(400).json({message:"email is already exist"});

        const hash= await bcrypt.hash(password,10);
        const user= await User.create({name,email,password:hash});
        
        //genrate token
        const token= GenerateJWT(user._id, user.email);
        res.status(200).json({id:user._id, name:user.name, email:user.email,token });

    }catch(err){
        console.error("Register Error: ",err)
        res.status(500).json({message:"Server Error", Error:err});
    }
}

async function Login(req,res) {
  try{
    const {email, password}= req.body;
    if ( !email || !password) return res.status(400).json({message:"missing fields"});

    const user= await User.findOne({email});
    if(!user) return res.status(400).json({message:"Invalid credentials"});

    const passwordIsmatch= await bcrypt.compare(password,user.password)
    if(!passwordIsmatch) return res.status(400).json({message:"password incorrect"})

    const token= GenerateJWT(user._id, user.email)
    res.status(200).json({id:user._id, name:user.name, email:user.email,token});

  }catch(err){
    console.error("Log in Error",err);
    res.status(500).json({message:"Server Error", Error:err})
  }
}

module.exports={
    Register,
    Login,
    
};