const mongoose= require("mongoose");

//define the schema
const UserSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true
     },
    email: {
        type:String,
        required:true , 
        unique:true},
    password:{
        type:String, 
        required:true
    },
    createdAt:{
        type:Date, 
        default:Date.now}
    
},{timestamps:true});


//set the model and export
const User= mongoose.model("User",UserSchema);
module.exports= User;