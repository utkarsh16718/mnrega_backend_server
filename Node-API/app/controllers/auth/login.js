// const { matchedData } = require('express-validator')

const {
  findUserByEmpId,
  // userIsBlocked,
  // checkLoginAttemptsAndBlockExpires,
  passwordsDoNotMatch,
  // saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken
} = require('./helpers')

const { handleError } = require('../../middleware/utils')
const { checkPassword } = require('../../middleware/auth')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
  try {
    // const data = matchedData(req)
    console.log(req.body.empId)
    const user = await findUserByEmpId(req.body.empId)
    // await userIsBlocked(user)
    // await checkLoginAttemptsAndBlockExpires(user)
    const isPasswordMatch = await checkPassword(req.body.password, user)
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch(user))
    } else {
      // all ok, register access and return token
      // user.loginAttempts = 0
      // await saveLoginAttemptsToDB(user)
      res.status(200).json(await saveUserAccessAndReturnToken(req, user))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { login }
