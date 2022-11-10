const mongooes = require("mongoose");
const CompanySchema = new mongooes.Schema({
    
    title:{
        type:String,
        required:true
    },
    
    // status:{
    //     type:Boolean,
    //     required:true
    // }
},{timestamps:true})


const Company = mongooes.model("Company",CompanySchema)
module.exports= Company;