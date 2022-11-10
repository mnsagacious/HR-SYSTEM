const express = require("express");
const router = express.Router();
const Departments = require('../Models/departments')
const {createError} = require('../Utils/CreateError')
const Positions = require("../Models/positions");
const xlsx = require("xlsx");
const fs = require("file-system");
const { json } = require("body-parser");
const Attendance = require('../Models/attendance')


router.get('/alluserattendance',async(req,res)=>{
    try{
        const abc = await Attendance.find().populate("employee","username")
        res.status(200).json(abc);
    }catch(error){
       console.log(error)
       res.status(500).json(err)
    }
})

router.get('/monthattendance/:month',async(req,res)=>{
    try{
        // const abc = await Attendance.find({month:req.params.month}).populate("employee",{ username: 1,emp_id:1,departments:1})


        const abc = await Attendance.find({month:req.params.month}).populate([
            {
              path: 'employee',
              model: 'Employees',
              select: 'username emp_id',
              populate: {
                path: 'departments',
                model: 'Departments',
                select:'departmentname'
              }
            },
          ])


        res.status(200).json(abc);
    }catch(error){
       console.log(error)
       res.status(500).json(err)
    }
})




router.get('/AttendanceForDate',async(req,res)=>{

    console.log("called")

    console.log("AttendanceForDate",req.query.date)

    try{
        // const abc = await Attendance.find({month:req.params.month}).populate("employee",{ username: 1,emp_id:1,departments:1})


        const abc = await Attendance.find({date:req.query.date}).populate({path:"employee",select:['username','emp_id','departments'],populate:{path:"departments",model:"Departments",select:["departmentname"]}})

        console.log("abc123",abc)

        res.status(200).json(abc);
    }catch(error){
       console.log(error)
       res.status(500).json(err)
    }
})




router.get('/currentUserAttendance',async(req,res)=>{

    console.log("called")

    console.log("AttendanceForDate",req.query.date)
    console.log("AttendanceForemployee",req.query.employee)



    try{
        // const abc = await Attendance.find({month:req.params.month}).populate("employee",{ username: 1,emp_id:1,departments:1})

        const abc = await Attendance.find({date:req.query.date, employee:req.query.employee})

        console.log("abc123",abc)

        res.status(200).json(abc);
    }
    catch(error){
       console.log(error)
       res.status(500).json(err)
    }
})

router.post('/postimport/attendance', async (req, res) => {
   
    try {
        
        // firstname: req.body.firstname,
        // lastname: req.body.lastname,
        // city:req.body.city

        console.log("attendanceeeeee",req.body)

        const attendance =await  Attendance.insertMany(req.body);
        console.log(req.body, "req body")
        // const user = await ecxel.save(); 
        res.status(200).json(attendance);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

})


router.get('/xls//attendance',async(req,res)=>{
    try{
        const wb = xlsx.readFile('./export.xlsx');
        console.log(wb.SheetNames);
        console.log(wb.Workbook)
        res.send(wb.Sheets)
        fs.writeFileSync("./ecxeljson.json",JSON.stringify(wb))
         
    }catch(error){
         console.log(error)
         res.send(error)
    }
    
})

router.delete('/attendance/all',async(req,res,next)=>{
   try{
    const dell = await Attendance.deleteMany()
    dell && res.status(200).json({message:"Successfully Deleted"})
   }catch(error){
    next(error)
   }
})




router.post('/userattendance', async (req, res,next) => {
   
    try {
        
        const userattendance = new Attendance({
            employee:req.body.employee,
            month:req.body.month,
            date:req.body.date,
            Name:req.body.Name,
            in:req.body.In,
            out:req.body.out,
            status:req.body.status   
        })
        const attendance = await userattendance.save();
        attendance && res.status(200).json({message:'Successfully posted ',attendance})
    } catch (err) {
        console.log(err)
       next(err)
    }

})



router.put('/updateuserattendance/:id', async (req, res,next) => {
    console.log("called")
    console.log("userattendance",req.body)

    try {
         
          const userattendance = await Attendance.findOneAndUpdate({employee:req.params.id, date:req.body.date},{$set:req.body},{ upsert: true, new: true, setDefaultsOnInsert: true });
        //   const userattendance = await userAttendance.findOneAndUpdate({'name':user.firstname,'date':req.body.date},{
        //     $set:req.body
        //   })
        //   const userattendance = await userAttendance.findAndUpdate({
        //   $set:{ out:req.body.out }
          
        // },{new:true})

        console.log("userattendance",userattendance)
       await userattendance && res.status(200).json({message:'Successfully updated ',userattendance})
    } catch (error) {
        console.log(error)
       next(error)
    }

})


module.exports = router