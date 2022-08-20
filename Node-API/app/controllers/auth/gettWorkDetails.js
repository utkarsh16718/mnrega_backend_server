
const User = require('../../models/workDetails')

const getWorkDetails = async (req, res) => {
    try {
        const { workId} = req.query;
        const attendence = await User.findOne({
            workId
        })
        if (attendence) {

            const mark = await User.find({workId})
            return res.status(201).json(mark)

        }
        else {
            res.status(404).json('Error In Getting Work Details')
        }
    }


    catch (error) {
        handleError(res, error)
      }
}
module.exports = { getWorkDetails}