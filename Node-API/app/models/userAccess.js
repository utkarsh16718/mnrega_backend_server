const mongoose = require('mongoose')
// const validator = require('validator')

const UserAccessSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      lowercase: true,
      required: true
    },
    ip: {
      type: String,
      required: true
    },
    browser: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('UserAccess', UserAccessSchema)
