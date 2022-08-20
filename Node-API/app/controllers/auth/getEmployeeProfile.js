
const NewUser = require('../../models/employeeRegistration')
const getEmployeeProfile = async (req, res) => {
    try {
        const { empId} = req.query;
        const attendence = await NewUser.findOne({
            empId
        })
        if (attendence) {

            const mark = await NewUser.findOne({empId})
            return res.status(201).json(mark)

        }
        else {
            return res.status(404).json("Error in getting Profile")
         
        }
    }


    catch (error) {
        handleError(res, error)
      }
         
    
}
module.exports = { getEmployeeProfile}