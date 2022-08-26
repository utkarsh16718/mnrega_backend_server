const NewUser = require('../../models/attendanceDetails')
const NewEmp = require('../../models/employeeRegistration')
const { handleError } = require('../../middleware/utils')

const getMyEmployeesAttendence = async (req, res) => {
  try {
    const { workId, supervisorId } = req.query

    let attendances = await NewUser.find({
      // workId,
      supervisorId
    }).select('presentemployeeIds')

    let presentEmpIds = attendances.map((attendance) => {
      return attendance.presentemployeeIds
    })

    presentEmpIds = [...new Set([].concat.apply([], presentEmpIds))]

    let allEmps = await NewEmp.find({
      supervisorId
    })

    let result = allEmps.map((emp) => {
      if (presentEmpIds.includes(emp.empId)) {
        emp.present = true
      } else {
        emp.present = false
      }
      return emp
    })
    return res.send({
      data: result
    })
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { getMyEmployeesAttendence }
