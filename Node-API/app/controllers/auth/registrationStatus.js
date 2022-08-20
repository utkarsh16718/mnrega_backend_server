
const User = require('../../models/employeeRegistration')

const { handleError } = require('../../middleware/utils')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


const registrationStatuss = async (req, res) => {
  try {
    const { empId } = req.query;
    const employeeExists = await User.findOne({
      empId
    })
    if (employeeExists) {

      const status = await User.updateOne({ empId }, { $set: { registrationStatus: true } })
      res.status(201).json('Status Changed')
    }
    else {
      res.status(404).json('Invalid EmpId')
    }
  }


  catch (error) {
    handleError(res, error)
  }
}

module.exports = { registrationStatuss }
