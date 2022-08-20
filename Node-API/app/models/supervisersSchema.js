const mongoose = require("mongoose");

const supervisersSchema = new mongoose.Schema({
  superviserId:{
    type:String,
    default:"",
    required:true,
    unique:true
  },
  // name:{
  //   type:String,
  //   default:"",
  //   required:true
  // },
  // fatherName:{
  //   type:String,
  //   default:"",
  //   required:true
  // },
  // profilePhoto:{
  //   type:String,
  //   default:"",
  //   required:true
  // },
  // position:{
  //   type:String,
  //   default:null,
  //   required:true,
  // },
  // fullAddress:{
  //   type:String,
  //   default:"",
  //   reequired:true
  // },
  // aadharNumber:{
  //   type:Number,
  //   default:"",
  //   required:true,
  //   unique:true
  // },
  // contact:{
  //   type:Number,
  //   default:"",
  //   required:true,
  //   unique:true
  // },
  emailId:{
    type:String,
    default:null,
    required:true,
    unique:true
  },
  // loginId:{
  //   type:String,
  //   default:null,
  //   required:true,
  //   unique:true
  // },
  password:{
    type:String,
    default:null,
    required:true,
    unique:true
  },
  
});

module.exports = mongoose.model("supervisor", supervisersSchema);
