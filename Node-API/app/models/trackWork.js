const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')


const trackWork = new mongoose.Schema({
  trackId: {
    type: String,
    default: null,
    required: true,
    unique: true
  },

  workId: {
    type: String,
    default: "",


  },
  WorkLocation: {
    type: String,
    default: "",

  },
  supervisorId: {
    type: String,
    default: "",

  },
  dateTime: {
    type: String,
    default: new Date().toISOString()
  },

  workId: {
    type: String,
    default: "",
  },
  videoLink: {
    type: String,
    default: "",

  },
  workHour: {
    type: String,
    default: "",

  },
  totalHumanCount: {
    type: String,
    default: "",

  },
  totalHumanWorkingCount: {
    type: String,
    default: "",

  },
  suspicious: {
    type: Boolean,
    default: null
  }
});
trackWork.plugin(mongoosePaginate)
module.exports = mongoose.model("track", trackWork);
