const mongoose = require("mongoose");

const forempstatus = new mongoose.Schema({
  dates:{
    type:String,
    default:null,
    required:true
  },
  status:{
    type:String,
    default:null
  }
  
});

module.exports = mongoose.model("employeeStatus", forempstatus);
