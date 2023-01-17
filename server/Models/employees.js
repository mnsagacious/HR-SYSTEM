const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const leaves = require('../Models/leaverequest')
const EmployeesSchema = new mongoose.Schema({
   //personal info //   
   emp_id:{
      type:String,
     },    
     firstname:{
        type:String,
        require:true
     },
     lastname:{
        type:String,
        require:true
     },
     dob:{
      type:Date,
      default:""
  },
  cnic:{
   type:Number,
   required:true
  },
  gender:{
   type:String,
   default:""
  },
  martialStatus:{
   type:String,
   default:""
  },
  religion:{
   type:String,
   default:""
  },
  //contact information//
  primaryphone:{
   type:String,
   require:true,
   trim: true,
   lowercase: true
   },
  secondaryphone:{
   type:Number,
   require:true
},
 primaryemail:{
      type:String,
      require:true,
      trim: true,
      lowercase: true
      },

     secondaryemail:{
      type:String,
      require:true,
      trim: true,
      lowercase: true
      },
   ///address and region//
   permanentaddress:{
      type:String,
      require:true
   },     
     temporaryaddress:{
        type:String,
        require:true
     },
     country:{
      type:String,
      default:""
   },
   province:{
      type:String,
      default:""
   }, 
   city:{
      type:String,
      default:""
    },

    postalCode:{
      type:String
     },
   //education details
    educationdetails:[
       {
         degreetitle:{
            type:String,
            default:"N/A"
         },
         institue:{
            type:String,
            default:"N/A"
         },
         start:{
            type:Date,
            default:""
         },
         end:{
            type:Date,
            default:""
         },
         status:{
            type:String,
            default:"N/A"
         }
       },

    ],
    employementhistory:[
      {
        company:{
           type:String,
            
           default:"N/A"
        },
        position:{
         type:String,
         default:""
        },
        joiningdate:{
           type:String,
           default:"N/A"
        },
        resignationdate:{
           type:Date,
           default:""
        },
        duration:{
           type:String,
           default:""
        },
        jobdescription:{
           type:String,
           default:"N/A"
        }
      },

   ],
   //administration
   username:{
      type:String,
      unique:true,
      require:true
   },
   password:{
      type:String,
      require:true
     },

   company:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Companies"
    },
    jobtitle:{
      type:String,
      default:""
     },
     designation:{
      type:String,
       default:"admin"
   },
    
   department:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:'Departments',
      
    },
    joiningdate:{
      type:String,
      default:Date.now

     },
     employementstatus:{
      type:String,
      default:""
     },
     terminationdate:{
      type:Date,
      default:"N/A"
   },
   terminationreason:{
      type:String,
      default:""
     },
     currentSalary:{
      type:Number,
      default:0,
     },    
     profilepic:{
      type:String,
      default:""
     },
     Leaves:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:'LeaveRequest'
     },
     //BANK INFORMATION
     paymentmode:{
      type:String,
      default:"N/A"
     },
     bankname:{
      type:String,
      default:""
     },
     accounttitle:{
      type:String,
      default:""
     },
     accountno:{
      type:Number,
      default:0
     },
     branchcode:{
      type:Number,
      default:0,
     },
     IBAN:{
      type:String,
     }, 
     ERCode:{
      type:Number,
      default:""
     },    
     role:{
        type:String,
        enum:["Employee","HR"],
        default:'Employee'
     },
     supervisors:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:'Employees',
      default:[]
      
    },
    supervisorStatus:{
     type:Boolean,
     default:false
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Owners'
    }
    
},{ timestamps: true },);

EmployeesSchema.pre('findOneAndDelete',async function(next){
   try{
         await leaves.deleteMany({employee:this._conditions._id});
         next();
   }catch(error){
      console.log(error);
   }
})
// EmployeesSchema.plugin(AutoIncrement, {inc_field: 'emp_id'});
const Employees = mongoose.model("Employees",EmployeesSchema) 
module.exports = {Employees,EmployeesSchema};
