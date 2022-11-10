const express = require("express")
const LeaveRequest = require("../../Models/leaverequest")
const router = express.Router();
const Emp  = require('../../Models/Employees');
const Employees = require("../../Models/Employees");
const mongodb = require('mongodb')


const mongoClient = mongodb.MongoClient
const binary = mongodb.Binary

async function insertFile (file, res) {
  mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, async(err, client) => {
      if (err) {

        console.log("error in insertFile",err)
          return err
      }
      else {
          let db = client.db('Attendance')
          let collection = db.collection('files')
          try {
               const erwin =  await collection.insertOne(file)
              console.log('File Inserted',erwin)
          }
          catch (err) {
              console.log('Error while inserting:', err)
          }
          client.close()
          // res.redirect('/')
      }

  })
}
//Adding a Calendar
router.post('/addrequest', async(req,res,next)=>{


  console.log("reqq",req.body)
   try{
    let file = {}
    if (req.files){
    file = { name: req.files.file.name, file: binary(req.files.file.data) }
    }
    // let file = { name: req.files.file.name, file: binary(req.files.file.data) }
    // await insertFile(file, res)


        const reqLeave = new LeaveRequest({
            leaveType:req.body.leaveType,
            from:req.body.from,
            to:req.body.to,
            reason:req.body.reason,
            status:req.body.status,
            employee:req.body.employee,
            backupresourse:req.body.backupresourse,
            applicationdate:req.body.applicationdate,
            attachment: file        
        })
        const saveRequest = await reqLeave.save();
        saveRequest && res.status(200).json({message:"Leave Request",saveRequest})
          try{
              const employe = req.body.employee;
              const updatedLeaves = await Emp.findByIdAndUpdate(employe,{
                $push:{Leaves:reqLeave._id}
              },
              {new:true,useFindAndModify:false}
              );
              updatedLeaves && res.status(200).json({message:"Success",updatedLeaves})
          }catch(error){
            next(error)
          }
        
          
   }catch(error){
    console.log(error)
    next(error)
   }

})


// all leaves request 

router.get('/allForHR',async(req,res,next)=>{
  try{
          const allRequest = await LeaveRequest.find().populate({path:'employee' , populate:[{path:'departments', select: ['departmentname']},{path:'Leaves'}]});
          const counted =await LeaveRequest.count();
          allRequest && res.status(200).json({message:"all Leave requests",allRequest,counted})
  }catch(error){
     next(error);
     console.log(error)
  }
})



router.get('/all/:id',async(req,res,next)=>{
    try{

      const subordinateEmployees = await Employees.find({supervisors: {$in: req.params.id}})
      let subordinateEmployeesIDs = subordinateEmployees.map(a => a._id);

      // console.log("subordinateEmployees",subordinateEmployeesIDs)
            const allRequest = await LeaveRequest.find({employee:subordinateEmployeesIDs}).populate({path:'employee' , populate:{path:'departments', select: ['departmentname']}});
            const counted =await LeaveRequest.count();
            allRequest && res.status(200).json({message:"all Leave requests",allRequest,counted})
    }catch(error){
       next(error);
       console.log(error)
    }
})

//only employee can see their leave request

router.get('/:id',async(req,res,next)=>{
    try{
        
         const response = await LeaveRequest.findById(req.params.id).populate({path:'employee backupresourse' , populate:[{path:'departments', select: ['departmentname']},{path:'Leaves'}]});
           const emp =await Emp.findById(response.employee._id).populate('departments' ,'departmentname')
         const dep = emp.department 
          response && res.status(200).json({message:"Success",response ,dep })

    }catch(error){
         next(error)
        console.log(error)
    }
})

//update status of leaves
router.put('/:id',async(req,res,next)=>{

  try{
         const findLeave = await LeaveRequest.findById(req.params.id)
          // console.log("leaveRequest",findLeave)
         const updateStatus = await LeaveRequest.findByIdAndUpdate(req.params.id,{
          $set: { status: req.body.status, supervisorApproval:req.body.supervisorApproval} ,
        
         },  { new: true })
        updateStatus && res.status(200).json({message:"Updated leave",updateStatus})
  }catch(error){
    next(error)
    console.log(error)
  }
})

module.exports = router;