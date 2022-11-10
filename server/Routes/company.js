const express = require('express')
const router = express.Router();
const Company = require("../Models/Company/Company")


router.post("/company",async(req,res,next)=>{
    try{ 
         const company = new Company({
            title:req.body.title
         }) 
          company && res.status(200).json({message:"Success",company})
    }catch(error){
           next(error)
    }
})

module.exports = router