const express = require('express')
const router = express.Router();
const Companies = require("../Models/Company/Company")
const createError = require('../Utils/CreateError')
const owner = require('../Models/Owners/Owners');
const { ObjectId } = require('bson');


router.get("/companies",async(req,res,next)=>{
    try{
         const companies = await Companies.find().populate('employees departments LeavesTypes');
         companies && res.status(200).json({message:"success",companies})
    }catch(error){
        next(error)
    }
});
router.get('/company/:id',async(req,res,next)=>{
  try{
       //multilevel population in this code
        const company = await Companies.findById(req.params.id)
        .populate([{
          path:"employees",
          model:"Employees",
          //in this block the populate only work for the employees 
          //table fields just like employees.firstname etc.....
          populate:{
            path:'supervisors',
            model:"Employees"
          }
        }]
        ).populate([
         {path:"owner",
         model:"Owners",
         select:{ownername:1,_id:1},}
        ]).populate([
          {path:"departments",
           model:"Departments",
           populate:{
            path:"employees",
            model:"Employees",
           }
        }]).populate([
          {path:"LeavesTypes",
           model:"Leaves",
        }])

        if(!company){
         next(createError(404,"Company not found"));   
        }
        company && res.status(200).json({message:"Success",company})
  }catch(error){
   next(error)
  }
})
router.post("/company",async(req,res,next)=>{
   
    try{ 
         const company = new Companies({
            title:req.body.title,
            status:req.body.status,
            owner:req.body.owner,
            Location:req.body.location,
         }) 
        
         const companies = await company.save();
          companies && res.status(200).json({message:"Success",companies});
         if(companies){
            await owner.findByIdAndUpdate(companies.owner,{
                $push:{companies:companies._id}
              })
         }
    }catch(error){
           next(error)
    }
})

router.put('/company/:id',async(req,res,next)=>{
    try{
            const findcompany = await Companies.findById(req.params.id);
            console.log("findcompany",findcompany) 
            const {reqBody} = req.body;
              if(!findcompany){
                  next(createError(404,"Company not found"))
              }

            //   console.log("empl",employees)
           const company = await Companies.findByIdAndUpdate(req.params.id,{
            $set:{...reqBody},
            $push:{employees:req.body.employees,departments:req.body.departments},
            // $push:{}
           }, { new: true });
           console.log("company",company)
          
           company && res.status(200).json({message:"Success",company})
           
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


router.get('/companies/query',async(req,res,next)=>{
    try{
          let {title} = req.query;
              const companies = await Companies.find({title:title}).populate('employees departments');
              console.log(companies);
              const matchid = companies[0]._id;
              console.log("ids",matchid)
              const result = await  Companies.aggregate([
                {
                  '$match': {
                    '_id': matchid
                  }
                }, {
                  '$project': {
                    'departments': 1, 
                    'employees': 1
                  }
                }, {
                  '$lookup': {
                    'from': 'departments', 
                    'localField': 'departments', 
                    'foreignField': '_id', 
                    'as': 'result'
                  }
                }, {
                  '$lookup': {
                    'from': 'employees', 
                    'localField': 'employees', 
                    'foreignField': '_id', 
                    'as': 'res'
                  }
                }, {
                  '$project': {
                    'result': 1, 
                    'res': 1
                  }
                }
              ]);
              companies && res.status(200).json({message:"success",companies,result});
            //   try{
            //        const sizes = await Companies.aggregate([
                     
            //             {
            //                 '$match':{
            //                    "match": new ObjectID('637cb954af69e09a3c9ec1c1') 
            //                 }
            //             }
            //        ])
            //        sizes && console.log("sizzes",sizes)
            //   }catch(error){
            //      console.log(error)
            //   }   
          
             console.log('result',result)
           
    }catch(error){
        next(error)
    }
})
router.get('/get/info',async(req,res,next)=>{
    try{
        const compwisedep = await Companies.findById()     
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
})
module.exports = router