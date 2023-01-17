
const mongooes = require("mongoose");
const {Employees} = require("../employees");
const departments = require("../departments")
const requests = require('../leaverequest')
const Leaves = require('../leavesTypes');
const { default: mongoose } = require("mongoose");

const CompanySchema = new mongooes.Schema({
    
    title:{
        type:String,
        required:true,
        unique:true
    },
    employees:{
        type:[mongooes.Schema.Types.ObjectId],
        ref:'Employees',
            },
    departments:{
        type:[mongooes.Schema.Types.ObjectId],
        ref:'Departments',
    },
    LeavesTypes:{
       type:[mongooes.Schema.Types.ObjectId],
       ref:'Leaves'
    },
    owner:{
      type:mongooes.Schema.Types.ObjectId,
      ref:'Owners',
      required:true
    },
    Location:{
      type:String,
      default:""
    },
    status:{
        type:Boolean,
        default:true,
    },
    positions:{
        type:[mongooes.Schema.Types.ObjectId],
        ref:'Positions'
    }

},{timestamps:true})

// CompanySchema.pre('remove',async function(next){
//      try{
//            this.model('Employees').remove({company:this._id},next);
//            this.model('Departments').remove({company:this._id},next)
//      }catch(error){
//        next(error)
//      }

// })

CompanySchema.pre('findOneAndDelete',async function(next){

   try{
    
    await Employees.deleteMany({company:this._conditions._id});
    await departments.deleteMany({company:this._conditions._id}); 
    await Leaves.deleteMany({company:this._conditions._id});
    await requests.deleteMany({company:this._conditions._id});
    next();
   }catch(error){
    console.log(error)
   }

})

// CompanySchema.pre('findOneAndDelete',async function(next){
//    try{
//     await departments.deleteMany({company:this._conditions._id})
//    }catch(error){
//     next(error)
//    }
// })
const Company = mongooes.model("Companies",CompanySchema) 
module.exports= Company;