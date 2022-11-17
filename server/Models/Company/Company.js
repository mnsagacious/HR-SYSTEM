const mongooes = require("mongoose");
const CompanySchema = new mongooes.Schema({
    
    title:{
        type:String,
        required:true,
        unique:true
    },
    employees:{
        type:[mongooes.Schema.Types.ObjectId],
        ref:'Employees',
        unique:true
    },
    departments:{
        type:[mongooes.Schema.Types.ObjectId],
        ref:'departments',
        unique:true
    },
    status:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})


const Company = mongooes.model("Companies",CompanySchema)
module.exports= Company;