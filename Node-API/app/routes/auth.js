const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

require('dotenv/config')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')

const {
  register,
  verify,
  forgotPassword,
  resetPassword,
  getRefreshToken,
  login,
  roleAuthorization
} = require('../controllers/auth')
const markAttendence = require('../controllers/auth/markAttendence')

// const reportSupervisorSchema = require('../controllers/auth/reportSupervisorSchema')

const postTrackWork = require('../controllers/auth/postTrackWork')

const putTrackWork = require('../controllers/auth/putTrackWork')

const getTrackWork = require('../controllers/auth/getTrackWork')

const date = require('../controllers/auth/date')

const addWork = require('../controllers/auth/addWork')

const getWorkDetails = require('../controllers/auth/gettWorkDetails')

const getAttachedWork = require('../controllers/auth/getAttachedWork')

const getAttendence = require('../controllers/auth/getEmployeeAttendence')

const getMyEmployeesAttendence = require('../controllers/auth/getMyEmployeesAttendence')

const getEmployeeProfile = require('../controllers/auth/getEmployeeProfile')

const registerEmployee = require('../controllers/auth/registerEmployee')

const registrationStatus = require('../controllers/auth/registrationStatus')

const changeSupervisor = require('../controllers/auth/changeSupervisor')

const putAttendence = require('../controllers/auth/putAttendence')

const supervisorDetails = require('../controllers/auth/supervisorRegistration')

const supervisorLogin = require('../controllers/auth/supervisorLogin')

const AssignWorkToSupervisor = require('../controllers/auth/AssignWorkToSupervisor')

const upload = require('../controllers/auth/uploadFile')

const {
  validateRegister,
  validateVerify,
  validateForgotPassword,
  validateResetPassword
} = require('../controllers/auth/validators')

const validation = require('../controllers/auth/validators/employeeValidator')
/*
 * Auth routes
 */

/*
 * Register route
 */
router.post('/register', trimRequest.all, validateRegister, register)

router.post(
  '/registerEmployee',
  trimRequest.all,
  validation.employeeValidator,
  registerEmployee.registerEmployee
)

router.get('/date', trimRequest.all, date.date)

router.get(
  '/registrationStatus',
  trimRequest.all,
  registrationStatus.registrationStatuss
)
router.get(
  '/registrationStatus/:id',
  trimRequest.all,
  registrationStatus.registrationStatuss
)

router.post(
  '/supervisorRegistration',
  trimRequest.all,
  supervisorDetails.create
)

router.post('/supervisorLogin', trimRequest.all, supervisorLogin.login)

router.post('/markAttendence', trimRequest.all, markAttendence.markAttendence)

router.put('/markAttendence', trimRequest.all, putAttendence.putAttendence)

router.post('/addWork', trimRequest.all, addWork.addWork)

router.get(
  '/getEmployeeAttendence/:id',
  trimRequest.all,
  getAttendence.getAttendence
)
router.get(
  '/getEmployeeAttendence',
  trimRequest.all,
  getAttendence.getAttendence
)

router.get(
  '/getEmployeeProfile',
  trimRequest.all,
  getEmployeeProfile.getEmployeeProfile
)
router.get(
  '/getEmployeeProfile/:id',
  trimRequest.all,
  getEmployeeProfile.getEmployeeProfile
)

router.get(
  '/getMyEmployeesAttendence',
  trimRequest.all,
  getMyEmployeesAttendence.getMyEmployeesAttendence
)
router.get(
  '/getMyEmployeesAttendence/:id/:workId/:dateTime',
  trimRequest.all,
  getMyEmployeesAttendence.getMyEmployeesAttendence
)

router.get('/getAttachedWork', trimRequest.all, getAttachedWork.getAttachedWork)
router.get(
  '/getAttachedWork/:id',
  trimRequest.all,
  getAttachedWork.getAttachedWork
)

router.get('/getWorkDetails', trimRequest.all, getWorkDetails.getWorkDetails)
router.get(
  '/getWorkDetails/:id',
  trimRequest.all,
  getWorkDetails.getWorkDetails
)

router.post(
  '/changeSupervisor',
  trimRequest.all,
  changeSupervisor.changeSupervisor
)
// router.post(
//   '/reportSupervisor',
//   trimRequest.all,
//   reportSupervisorSchema.reportSupervisorSchema)

router.post(
  '/AssignWorkToSupervisor',
  trimRequest.all,
  AssignWorkToSupervisor.AssignWorkToSupervisor
)
router.post('/postTrackWork', trimRequest.all, postTrackWork.postTrackWork)
router.put('/putTrackWork', trimRequest.all, putTrackWork.putTrackWork)
router.get('/getTrackWork', trimRequest.all, getTrackWork.getTrackWork)
router.get('/getTrackWork/:id', trimRequest.all, getTrackWork.getTrackWork)

aws.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION
})
// const BUCKET = process.env.BUCKET
router.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.file)

  res.send({ url: req.file.location })
  // console.log(req.file.etag)
})
// router.post('/register', trimRequest.all, validateRegister, register)
/*
 * Verify route
 */
router.post('/verify', trimRequest.all, validateVerify, verify)

/*
 * Forgot password route
 */
router.post('/forgot', trimRequest.all, validateForgotPassword, forgotPassword)

/*
 * Reset password route
 */
router.post('/reset', trimRequest.all, validateResetPassword, resetPassword)

/*
 * Get new refresh token
 */
router.get(
  '/token',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  getRefreshToken
)

/*
 * Login route
 */
router.post(
  '/login',
  trimRequest.all,
  // validateLogin,
  login
)

module.exports = router
