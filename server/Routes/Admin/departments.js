const express = require("express");
const router = express.Router();
const Departments = require('../../Models/departments')
const {createError} = require('../..//Utils/CreateError')
// const Emp = require('../../Models/Users');
const {Employees} = require('../../Models/employees');
const Company = require('../../Models/Company/Company');
const {ObjectId} = require('mongodb')
const { Error } = require("mongoose");
router.get('/',async(req,res,next)=>{
    try{
        const departments = await Departments.find().populate('employees');
        console.log(departments)
        const counted = await  Departments.count();
        // const employess =departments.employees.count()
       
        departments && res.status(200).json({message:"Success",departments,counted})
        
        console.log("Count",counted)
        // console.log("employees in a department",employess)
      
      
    }catch(error){
       console.log(error)
       next(error)
    }
})
//single department
router.get('/:id',async(req,res,next)=>{
    try{
          const department = await Departments.findById(req.params.id).populate('employees');
          department  && res.status(200).json({message:"Success",department})
    }catch(error){
         next(error)
    }
})
//for select department first and then employees;
router.get('/getemployee/:id',async(req,res,next)=>{
  try{
         let {department} = req.query;
         const employees = await Departments.findById(req.params.id).populate('employees');
         employees && res.status(200).json({message:"success",employees})
  }catch(error){
       next(error)
       console.log(error)
  }
})
//add a department
router.post('/adddepartment', async (req, res, next) => {
   
    try {
         const departmetdata = new Departments( {
            departmentname:req.body.departmentname,
            description: req.body.description,
            company:req.body.company,
            owner:req.body.owner

         })
        
         const department  =  await departmetdata.save();
         department && res.status(200).json({message:"Added Department",department});
         if(department.company){
            await Company.findByIdAndUpdate(req.body.company,{
               $push:{departments:department._id}
            })
        }
       
    } catch (err) {
        console.log(err)
        next(err)
        res.status(500).json(err);
    }

})
//update
router.put('/:id',async(req,res,next)=>{
      
   
    const {emplId,company} = req.body
    try{
          const find = await Departments.findById(req.params.id);
          if(!find){
            next(createError(404,"Department not found"))
          }
         const updateDep = await Departments.findByIdAndUpdate(req.params.id,{
            $set:{...req.body},
            $push:{employees:emplId}
         },{new:true,useFindAndModify:false});
        console.log(updateDep,"updateDep")
        if(company){ await Company.findByIdAndUpdate(company,{
               $push:{departments:req.params.id}
            })
        };
       await  updateDep && res.status(200).json({message:"Success",updateDep})
    }catch(error){
        next(error)
    }
})
//delete employee from department
router.put('/delete/:id',async(req,res,next)=>{

    try{
                
               
                const department = await Departments.findById(req.params.id);
                console.log("department",department)
                
                const update = await Departments.findByIdAndUpdate(req.params.id,{
                    $pull:{employees:{$in:req.body.id}}
                })
                
                console.log("updated",update)
              update && res.status(200).json({messgae:"Updated List of employees",update})
    }catch(error){
        next(error)
    }

})
//delete department
router.delete('/:id',async(req,res,next)=>{
    try{
         console.log("hello")
        const department = await Departments.findById(req.params.id);
         console.log("department",department);
         console.log("params",req.params.id)
         const deletee  = await Departments.findByIdAndDelete(req.params.id)
         await Company.findByIdAndUpdate({_id:department.company},{
            $pull:{departments:req.params.id}
         })
         deletee && res.status(200).json({messgae:"Deleted",deletee})
    }catch(error){
      next(error)
    }
})


//Add Employee to a department 
router.put('/:id/addemployee',async(req,res,next)=>{
    try{
             

             
             const department = await Departments.findByIdAndUpdate(req.params.id,{
                $push:{employees:req.body.id}
             },{new:true,useFindAndModify:false})
             console.log(department)
             department && res.status(200).json({message:"Sucessfully Added Employee",department})
            console.log(department)
            
             
    }catch(error){
            next(error)
    }
})

/// department Info 
router.get('/get/info',async(req,res,next)=>{
    try{
               
        const depwiseemployees= await Departments.aggregate([
            {
              '$project': {
                'employees': {
                  '$size': '$employees'
                }, 
                'departmentname': 1
              }
            }
          ]) 
          console.log(depwiseemployees)
          depwiseemployees && res.status(200).json({message:"Success",depwiseemployees})
    }catch(error){
       console.log(error)
       next(error)
    }
});
router.get('/get/info/:id',async(req,res,next)=>{
    try{
               
        const depwiseemployees= await Departments.aggregate([
            {
              '$match': {
                'company': new ObjectId(req.params.id)
              }
            }, {
              '$project': {
                'employees': {
                  '$size': '$employees'
                }, 
                'departmentname': 1
              }
            }
          ])
          console.log(depwiseemployees)
          depwiseemployees && res.status(200).json({message:"Success",depwiseemployees})
    }catch(error){
       console.log(error)
       next(error)
    }
});
module.exports = router