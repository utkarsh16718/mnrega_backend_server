const mongoose = require("mongoose");

const errordetails = new mongoose.Schema({
  error:{
    type:String,
    default:null,
    required:true
  },
  description:{
    type:String,
    default:null
  }
  
});

module.exports = mongoose.model("error", errordetails);
