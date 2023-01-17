const mongoose = require('mongoose');
const companies = require('../Company/Company');
const {Employees} = require('../employees');
const department = require('../departments')
const leaves = require('../leavesTypes');
const leavesRequest = require('../leaverequest')
const OwnerSchema = new mongoose.Schema({

     ownername:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     username:{
        type:String,
        unique:true,
     },
     dob:{
        type:Date,
        default:Date.now()
     },
     password:{
        type:String,
        required:true
     },
     companies:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Companies'
     },
     role:{
        type:String,
        default:'CEO'
        
     }
},{timestamps:true});

OwnerSchema.pre('findOneAndDelete',async function(next){
    try{
         await companies.deleteMany({owner:this._conditions._id})
         await Employees.deleteMany({owner:this._conditions._id});
         await department.deleteMany({owner:this._conditions._id})
         await leaves.deleteMany({owner:this._conditions._id});
         await leavesRequest.deleteMany({owner:this._conditions._id})
        
        }catch(error){
         next(error)
    }
})
const Owners = mongoose.model('Owners',OwnerSchema);
module.exports=Owners;