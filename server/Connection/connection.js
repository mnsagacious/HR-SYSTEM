const dotenv = require('dotenv')
const mongoose = require("mongoose");
const path = require("path")
const url = "mongodb://localhost:27017/TestHR"
// const url = "mongodb://localhost:27017/Attendance"
//env


//Mongo Connection
const connectDB = async( )=>{
   
     try{
           mongoose.connect(url,{
                 useUnifiedTopology:true,
                 useNewUrlParser:true,
           });
           console.log("Connection Sucess MongoDb")

     }catch(err){
        console.log('failed' + err)
     }
}
module.exports= connectDB;