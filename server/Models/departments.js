const mongoose = require("mongoose")
const departmentSchema  = mongoose.Schema({
    departmentname:{
        type:String,        
    },
    description:{
        type:String,       
    },
    company:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Companies'
    },
    employees:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Employees'
   }],
   owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Owner'
   },
   positions:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'Positions'
   }
    
})


const Department =  mongoose.model("Departments",departmentSchema);
module.exports = Department