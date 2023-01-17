
const Owners = require('../../../Models/Owners/Owners');
console.log(Owners,"owners")
const {createError} = require("../../../Utils/CreateError")

const getallowners =async(req,res,next)=>{
    try{      
        const allowners = await Owners.find().populate({path:'companies',populate:[{path:'employees'}]});
        allowners && res.status(200).json({message:"Success",allowners})

    }catch(error){
        next(error)
    }
}
const getspecificOwners = async (req,res,next)=>{
    
    try{
       const getOwner = await Owners.findById(req.params.id).populate({path:'companies',populate:[{path:'employees'}]});
       console.log(getOwner,"get owner")
       if(!getOwner){
        next(createError(404,"Owner not found"));
        // const Owner = await Owners.findById(req.params.id);
       }
       const owner = getOwner
       owner && res.status(200).json({message:"Success",owner})
    }catch(error){
     next(error)
    }
}
const updateOwners = async (req,res,next)=>{
    
    try{
       const getOwner = await Owners.findById(req.params.id);
       if(!getOwner){
        next(createError(404,"Owner not found"));
        
       }
       const updatedOwner = await Owners.findByIdAndUpdate(req.params.id,{
        $set:req.body
    });
    updatedOwner && res.status(200).json({message:"Success",updatedOwner})
    }catch(error){
     next(error)
    }
}

const deleteOwners = async (req,res,next)=>{
    
    try{
       const getOwner = await Owners.findById(req.params.id);
       if(!getOwner){
        next(createError(404,"Owner not found"));   
       }
       const deleteOwner = await Owners.findByIdAndDelete(req.params.id);
       deleteOwner && res.status(200).json({message:"Success",deleteOwner})
    }catch(error){
     next(error)
    }
}

module.exports ={deleteOwners,getallowners,updateOwners,getspecificOwners}