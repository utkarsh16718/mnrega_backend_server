
const User= require('../../models/workDetails')
// const User1= require('../../models/supervisersSchema')

const { handleError } = require('../../middleware/utils')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


const AssignWorkToSupervisor = async (req,res) => {
  try {
    const { workId,supervisorId} = req.body;
    const employeeExists = await User.findOne({
    workId
    })
      if(employeeExists)
      {
       
       const status=await User.updateOne({workId},{$set:{supervisorId:supervisorId}})
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

module.exports = { AssignWorkToSupervisor }
