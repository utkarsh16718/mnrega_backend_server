
const User= require('../../models/employeeRegistration')
// const User1= require('../../models/supervisersSchema')

const { handleError } = require('../../middleware/utils')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


const changeSupervisor = async (req,res) => {
  try {
    const { empId,supervisorId} = req.body;
    const employeeExists = await User.findOne({
    empId
    })
      if(employeeExists)
      {
       
       const status=await User.updateOne({empId},{$set:{supervisorId:supervisorId}})
       res.status(201).json({'supervisorId':supervisorId})
      }
       else{
        return res.status(404).json('Invalid Employee ID')
        }
       }

    
    catch (error) {
      handleError(res, error)
    }
}

module.exports = { changeSupervisor }
