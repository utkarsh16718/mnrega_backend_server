const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const AllWorksDetail = new mongoose.Schema({
  workId:{
    type:String,
    default:"",
    required:true,
    unique:true
  },
  workDesciption:{
    type:String,
    default:"",
    required:true
  },
  workLocation:{
    type:String,
    default:"",
    required:true
  },
  supervisorId:{
    type:String,
    default:"",
    required:true,
    
  }
});
AllWorksDetail.plugin(mongoosePaginate)

module.exports = mongoose.model("AllWorks", AllWorksDetail);
