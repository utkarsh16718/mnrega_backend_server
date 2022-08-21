const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const employeeRegistration = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  empId: {
    type: String,
    default: null,
    required: true,
    unique: true
  },
  doB: {
    type: String,
    default: null
    // required:true
  },
  aadharNumber: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },

  registrationStatus: {
    type: Boolean,
    default: false
  },
  workId: { type: String, default: '' },
  supervisorId: { type: String, default: '' },
  registrationVideoLink: {
    type: String,
    default: ''
  },
  present: {
    type: Boolean,
    default: null
  }
})

employeeRegistration.plugin(mongoosePaginate)
module.exports = mongoose.model('employee', employeeRegistration)
