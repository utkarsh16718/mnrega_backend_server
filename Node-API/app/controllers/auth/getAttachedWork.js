
const User = require('../../models/workDetails')
const { handleError } = require('../../middleware/utils')

const getAttachedWork = async (req, res) => {
    try {
        const { superviserId} = req.query;
        const attendence = await User.find({
            superviserId
        })
        if (attendence) {

            const mark = await User.find({superviserId})
            res.status(201).json(mark)

        }
        else {
            res.status(404).json('Error In Getting Work Details')
        }
    }


    catch (error) {
        handleError(res, error)
    }
}
module.exports = { getAttachedWork}