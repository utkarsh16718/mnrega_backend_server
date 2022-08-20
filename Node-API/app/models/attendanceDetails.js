const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')


const attendenceDetail = new mongoose.Schema({
  attendanceId: {
    type: String,
    default: null,
    required: true,
    unique: true
  },

  supervisorId: {
    type: String,
    default: "",


  },

  dateTime: {
    type: String,
    default: new Date().toISOString()


  },


  presentemployeeIds: [
    {
      type: String
    }],




  // presentemployeeIds: [

  //   {
  //     empId: String,
  //     type: {
  //       type: { type: String }
  //     },
  //   }
  // ],

  WorkLocation: {
    type: String,
    default: "",

  },
  workId: {
    type: String,
    default: "",
  },
  groupPhotoUrl: {
    type: String,
    default: "",


  }

});
attendenceDetail.plugin(mongoosePaginate)
module.exports = mongoose.model("attendence", attendenceDetail);
