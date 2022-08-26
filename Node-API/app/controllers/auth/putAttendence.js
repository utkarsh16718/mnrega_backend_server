const NewUser = require('../../models/attendanceDetails')

const { handleError } = require('../../middleware/utils')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const putAttendence = async (req, res) => {
  try {
    // const attendanceId = req.query.attendanceId
    console.log(req.body)
    const { presentemployeeIds, attendanceId } = req.body
    const employeeExists = await NewUser.findOne({
      attendanceId
    })
    if (employeeExists) {
      const attendence = await NewUser.updateOne(
        { attendanceId },
        { $push: { presentemployeeIds } }
      )
      res.status(201).json({ 'Attendence Added': attendence })
    } else {
      res.status(404).json('Invalid Attendence ID')
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { putAttendence }
