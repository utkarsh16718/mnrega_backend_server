
const User = require('../../models/trackWork')
const { handleError } = require('../../middleware/utils')

const getTrackWork = async (req, res) => {
    try {
        const { trackId} = req.query;
        const attendence = await User.find({
            trackId
        })
        if (attendence) {

            const mark = await User.find({trackId})
            res.status(201).json(mark)

        }
        else {
            res.status(404).json('Error In Getting Track Details')
        }
    }


    catch (error) {
        handleError(res, error)
    }
}
module.exports = { getTrackWork}