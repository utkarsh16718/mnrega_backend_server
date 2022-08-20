// const uuid = require('uuid')
// const User = require('../../../models/employeeRegistration')
// const { buildErrObject } = require('../../../middleware/utils')

// /**
//  * Registers a new user in database
//  * @param {Object} req - request object
//  */
// const registerEmployeeHelper = (req = {}) => {
//   return new Promise((resolve, reject) => {

//     const { firstName,middleName,lastName,dob,aadharNumber,phone,city, empId, password } = req.body;
    

//     //   verification: uuid.v4()
//     })
//     user.save((err, item) => {
//       if (err) {
//         reject(buildErrObject(422, err.message))
//       }
//       resolve(item)
//     })
//   }


// module.exports = { registerEmployeeHelper }
