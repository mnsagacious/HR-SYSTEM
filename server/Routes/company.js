const express = require('express')
const router = express.Router();
const Companies = require("../Models/Company/Company")
const createError = require('../Utils/CreateError')

router.get("/companies",async(req,res,next)=>{
    try{
         const companies = await Companies.find();
         companies && res.status(200).json({messgae:"success",companies})
    }catch(error){
        next(error)
    }
})
router.post("/company",async(req,res,next)=>{
   
    try{ 
         const company = new Companies({
            title:req.body.title,
            status:req.body.status
         }) 
        
         const rescompany = await company.save()
          rescompany && res.status(200).json({message:"Success",rescompany})
    }catch(error){
           next(error)
    }
})

router.put('/company/:id',async(req,res,next)=>{
    try{
            const findcompany = await Companies.findById(req.params.id);
            console.log("findcompany",findcompany) 
            const {reqBody,employees,departments} = req.body;
              if(!findcompany){
                  next(createError(404,"Company not found"))
              }

            //   console.log("empl",employees)
           const company = await Companies.findByIdAndUpdate(req.params.id,{
            $set:{...reqBody},
            $push:{employees:employees},
            $push:{departments:departments}
           });
           console.log("company",company)
           const updated = company
           updated && res.status(200).json({message:"Success",updated})
           
    }catch(error){
        next(error)
    }
})

router.delete('/company/:id',async(req,res,next)=>{
    try{
          const findcompany = await  Companies.findById(req.params.id)
           
          if(!findcompany){
            next(createError(404,"Company not Found"))
          }
          const DeletdCompany = await Companies.findByIdAndDelete(req.params.id);
          DeletdCompany && res.status(200).json({message:"Success",DeletdCompany})
    }catch(error){
          next(error)
    }
})
module.exports = router