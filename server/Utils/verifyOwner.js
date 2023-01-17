const jwt = require("jsonwebtoken");
const {createError} = require('./CreateError');


const verifyToken = async (req,res,next) =>{
    try{ 
        const token = req.cookies.Onwer_JWT;
        if(!token){
            next(createError(404,"Not Authenticated"))
        };

        jwt.verify(token,process.env.Onwer_JWT,(err,user)=>{
            if(err){
                return next(createError(401,"token is not valid"))
            }
            req.user = user;
            next();
        })

    }catch(error){
        next(error)
    }
}

const verifyOwner = async (req,res,next) =>{

    try{
         verifyToken(req,res,next,()=>{
            if(req.body.id === req.params.id || req.user.role){
                next();
            }else{
                next(createError(403,"Please Login "))
            }
         })
    }catch(error){
        next(error)
    }
}


module.exports ={verifyToken,verifyOwner}