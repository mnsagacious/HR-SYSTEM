
const express = require('express')
const router = express.Router()
const Employees = require('../Models/Employees')
const Department = require('../Models/departments')
const {createError} = require('../Utils/CreateError')
//for getting All employee

router.get("/", async (req, res,next) => {
    try {
        //pagination start
       let {page,limit} = req.query; 
       //if user not sending any page or limit 
      
       if(!page) page =1;
       if(!limit) limit =8;
       const skip = (page -1) *10;

       const employees = await Employees.find().populate({path:'departments',select:"departmentname"}).skip(skip).limit(limit);
      // const employees = await Employees.find().populate("departments");
       const counted = await Employees.count();
      res.status(200).json({message:"Employees",Page:page,Limit:limit,employees,counted});
    } catch (err) {
        next(err)
        console.log(err)
    }
  });
  // get all employees of specified departments

router.get("/employeesofdepartments", async (req, res, next) => {
   console.log("params",req.query)
  try {
    const employees = await Employees.find({departments: {$in: req.query.departments}});
    // const counted = await Employees.count();
    res.status(200).json({ message: "Employees", employees });
  } catch (err) {
    console.log(err)

    next(err)
  }
});
router.get("/autocomplete",async(req,res,next)=>{
  try{
       const {search} = req.query;
       let regex = new RegExp(search,'i')
       const results = await Employees.find().or([{ 'firstname': { $regex: regex }}, { 'lastname': { $regex: regex }}]).populate({path:'departments',select:"departmentname"});
       results && res.status(200).json({message:"sucess",results})
  }catch(error){
      next(error);
      console.log(error)
  }
})
  //for deleting an employeee
  
  router.delete("/:id", async (req, res, next) => {
    // if (req.body.empId === req.params.id)
  
    // try {
    const employee = await Employees.findById(req.params.id);
    console.log(employee)
    try {
      await Employees.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
      try { 
       
  
  
        const deleteOne =await  Department.findByIdAndUpdate(
          employee.departments,
  
          {
            $pull: { employees: { $in: employee._id } }
          }
          
        );
        console.log("deleted",deleteOne);
      } catch (error) {
        next(error);
        console.log("error",error)
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  
  
  
   
  });
  

  //for getting specific employee
  
  router.get("/:id", async (req, res,next) => {
    try {
      const employee = await Employees.findById(req.params.id).populate('departments Leaves supervisors' ,"departmentname" );
      // const employee = await Employees.findById(req.params.id).populate('departments');
      await employee.populate('Leaves')
      await employee.populate('supervisors')
      console.log(employee)
      
      const { password, ...others } = employee._doc;
      res.status(200).json(others);
    } catch (error) {
      next(error)
      console.log(error)
    }
  });
  
  ///updating Employee DATA
  ///updating Employee DATA

router.put("/:id", async (req, res, next) => {

 
  const { departments, supervisors, ...reqBody } = req.body;
  
  try {
    const updateData = await Employees.findByIdAndUpdate(
      req.params.id,
      // {
      //   $set: req.body,
      // },

      {
        $set: { ...reqBody },
        $push: { departments: req.body.departments },
        $push: { supervisors: req.body.supervisors }

      },
      { new: true, useFindAndModify: false }
    ).populate('supervisors');
    updateData && res.status(200).json({ message: "updated", updateData });
  } catch (error) {
    next(error)
  }

});
  


  //pull department;
  router.put('/pull/:id',async(req,res,next)=>{
  
    try {
      const updateData = await Employees.findByIdAndUpdate(
        req.params.id,
        // {
        //   $set: req.body,
        // },
      
         {              
         
           $pull: { departments: { $in: req.body.id } }
        },
      
      );
     updateData && res.status(200).json({message:"updated",updateData});
     console.log(updateData.departments)
    } catch (error) {
     next(error)
    }
  })

  
  
  module.exports = router