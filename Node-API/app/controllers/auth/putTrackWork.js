
const NewUser = require('../../models/trackWork')

const { handleError } = require('../../middleware/utils')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */



const putTrackWork = async (req, res) => {
  try {
    
    const { trackId,totalHumanCount,totalHumanWorkingCount} = req.body;
    const employeeExists = await NewUser.findOne({
        trackId
    })
    if (employeeExists) {

      const attendence = await NewUser.updateMany({trackId},{ $set :{ totalHumanCount,totalHumanWorkingCount,suspicious:true}})
      res.status(201).json({ 'Updated': attendence })
    }
    else {
      res.status(404).json('Invalid Track ID')
    }
  }


  catch (error) {
    handleError(res, error)
  }
}

module.exports = { putTrackWork }
