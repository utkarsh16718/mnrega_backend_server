const { buildErrObject } = require('../../../middleware/utils')

/**
 * Adds one attempt to loginAttempts, then compares loginAttempts with the constant LOGIN_ATTEMPTS, if is less returns wrong password, else returns blockUser function
 * @param {Object} _user - user object
 */
const passwordsDoNotMatch = async () => {
  return new Promise(async (_resolve, reject) => {
    try {
      // user.loginAttempts += 1
      // await saveLoginAttemptsToDB(user)
      // if (user.loginAttempts <= LOGIN_ATTEMPTS) {
      return reject(buildErrObject(409, 'WRONG_PASSWORD'))
      // }

      // resolve(await blockUser(user))
    } catch (error) {
      throw error
    }
  })
}

module.exports = { passwordsDoNotMatch }
