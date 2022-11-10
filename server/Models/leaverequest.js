const { Binary } = require("mongodb");
const mongoose = require("mongoose");

const leaveRequestSchema = mongoose.Schema({
    leaveType:{
        type:String,
        required:true
    },
    from:{
        type:Date,
        require:true
    },
    to:{
       type:Date,
       require:true
    },
    reason:{
        type:String,
        default:"N/A"
    },
    status:{
        type: String,
        enum:["Approved","Pending Approval","Reject"],
        default:"Pending Approval"
        
    },
    supervisorApproval:{
        type: String,
        enum:["Approved","Pending Approval","Reject"],
        default:"Pending Approval"
        
    },
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employees'
    },
    applicationdate:{
          type:Date,
          default:Date.now
    },
    backupresourse:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Employees'
    },
    attachment:{
        type:mongoose.Schema.Types.Mixed
    }

 

})

const LeaveRequest = mongoose.model('LeaveRequest',leaveRequestSchema);
module.exports = LeaveRequest