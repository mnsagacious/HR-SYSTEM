const mongoose = require("mongoose")
const departmentSchema  = mongoose.Schema({
    
    
    position:{
        type:String,
        required:true
    },
    assignTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Companies'
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Departments'
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Owners'
    },
    employees:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Employees'
    }
})

const Positions = mongoose.model('Positions',departmentSchema)
module.exports = Positions