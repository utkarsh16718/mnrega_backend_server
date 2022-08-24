const User = require('../../../models/employeeRegistration')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findUserByEmpId = (empId = '') => {
  return new Promise((resolve, reject) => {
    User.findOne({ empId }, async (err, item) => {
      try {
        await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { findUserByEmpId }
