const express = require("express");
const router = express.Router();
const Companies = require('../Models/Company/Company')
const {createError} = require('../Utils/CreateError')
const Positions = require("../Models/positions");
const Departments = require('../Models/departments');
const Employees = require('../Models/employees');
const mongoose = require("mongoose");

router.get('/positions',async(req,res,next)=>{
    try{
        const positions = await Positions.find();
        positions && res.status(200).json({message:"Success",positions})
       
    }catch(error){
       console.log(error)
       next(error)
    }
})

router.post('/addposition', async (req, res, next) => {
   
    try {
         const companies = await Companies.find();
         console.log("companies",companies);
         const selectdcompany = await Companies.findById(req.body.assignTo);
         console.log("selected company",selectdcompany);
         const addPosition = new Positions({
            assignTo:selectdcompany,
            position:req.body.position,
            owner:req.body.owner,
            department:req.body.department,
            employee:req.body.employee
         })
         const addedposition  =  await addPosition.save();
         const updatecompany = await  Companies.findByIdAndUpdate(selectdcompany,{
            $push:{positions:addedposition}
        });
        const updateDepartment = await Departments.findByIdAndUpdate(req.body.department,{
            $push:{positions:addedposition}
        });
         console.log("department",updateDepartment)
        
         addedposition && updatecompany && res.status(200).json({message:"Added position",addedposition});
      
       
    } catch (error) {
        console.log(error)
       next(error)
    }

})
//get specific position according to company
router.get('/company/positions/:id',async(req,res,next)=>{
   try{
    const company =await Companies.findById(req.params.id);
    console.log("company",company);
    const positions = await Positions.find({company:company}).populate("department assignTo employees");
    console.log("positions",positions);
    positions  && res.status(200).json({message:"success",positions})
   }catch(error){
    next(error)
   }  
});

//query parameters for shuffle positions according to the departments

router.get('/positions/query',async(req,res,next)=>{
try{
     console.log("i am in query")
          let {department} = req.query;
          
          console.log("query ",department)
         const positions = await Positions.find({department:department }).populate([
            {
                path:"assignTo",
                model:"Companies",
                select:"_id title",
                
                // populate:{
                //     path:"employees",
                //     model:"Employees",
                //     populate:{
                //         path:"company",
                //         model:'Companies',
                //         populate:{
                //          path:"owner",
                //          model:'Owners',
                //          select:'_id email ownername'
                //         },
                //         select:"title _id owner"
                //     },
                //     select:'firstname lastname company '
                // }
            }
         ]).populate({path:'department',model:'Departments',populate:{path:'employees',model:'Employees'}})
         
         positions && res.status(200).json({message:"Success",positions})

}catch(error){
 next(error)
}
})

//update
router.put('/positions/:id',async(req,res,next)=>{
    try{
        const position = await Positions.findByIdAndUpdate(req.params.id,{
            $set:req.body
        });
        position && res.status(200).json({message:"Successfully Updated"})
    }catch(error){
        next(error)
      console.log(error)
    }
});
//delete
router.delete('/positions/:id',async(req,res,next)=>{
    try{ 
         const findposition = await Positions.findById(req.params.id);
         if(findposition){
            next(createError(404,"position not found"))
         }
        const position = await Positions.findByIdAndDelete(req.params.id);
        position && res.status(200).json({message:"successfully deleted"})
    }catch(error){
            next(error)
    }
})

module.exports = router