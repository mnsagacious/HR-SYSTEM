const Leaves = require("../../Models/leavesTypes");
const express = require("express")
const router = express.Router();
const Company = require('../../Models/Company/Company')

router.post('/addleaves',async(req,res,next)=>{
    const {leaveType,description,company,owner,LeaveStatus } = req.body
    try{
        const leaves = new Leaves({
            leaveType:leaveType,
            description:description,
            company:company,
            owner:owner,
            LeaveStatus:LeaveStatus
        })
        console.log("before",leaves)
        const postLeave = await leaves.save();
        try{
             console.log("company",company, postLeave)
            const pushs  =   postLeave && company && await Company.findByIdAndUpdate(company,{
                   $push:{LeavesTypes:postLeave._id}
                })
                console.log("push",pushs);
                
           }catch(error){
             next(error)
           }
        postLeave && res.status(200).json({message:"Leave added",postLeave})
        console.log("post leave ",postLeave._id)
       
      
       }catch(error){
        next(error)
       }
})
router.get('',async(req,res,next)=>{
    try{
           const getLeave = await Leaves.find();
           getLeave && res.status(200).json({message:"leaves",getLeave})
    }catch(error){
     next(error)
    }
})
router.put('/:id',async(req,res,next)=>{
    try{
           const updateLeave = await Leaves.findByIdAndUpdate(req.params.id,{
            $set:req.body
           });
           updateLeave && res.status(200).json({message:"leaves",updateLeave})
    }catch(error){
     next(error)
    }
})
router.delete('/:id',async(req,res,next)=>{
    try{
           const deleted = await Leaves.findByIdAndDelete(req.params.id,);
           deleted && res.status(200).json({message:"deleted leave",deleted})
    }catch(error){
     next(error)
    }
})
module.exports = router