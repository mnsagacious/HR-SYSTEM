const mongoose = require("mongoose");

const leavesSchema = mongoose.Schema({
    leaveType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Companies'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Owners'
    }
   
})

const LeavesTypes = mongoose.model('Leaves',leavesSchema);
module.exports = LeavesTypes