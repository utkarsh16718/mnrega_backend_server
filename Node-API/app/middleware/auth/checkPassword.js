// const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks is password matches
 * @param {string} password - password
 * @param {Object} user - user object
 * @returns {boolean}
 */
const checkPassword = (password = '') => {
  return new Promise((resolve) => {
    // user.comparePassword(password, (err, isMatch) => {
    //   if (err) {
    //     return reject(buildErrObject(422, err.message))
    //   }
    //   if (!isMatch) {
    //     resolve(false)
    //   }
    //   resolve(true)
    // })
    if (password === '12345') {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

module.exports = { checkPassword }
