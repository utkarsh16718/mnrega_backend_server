const User = require('../../models/trackWork')
const { handleError } = require('../../middleware/utils')
// const id = crypto.randomBytes(16).toString("hex");
const crypto = require("crypto");

const postTrackWork = async (req, res) => {
    try {
        const trackId = crypto.randomBytes(16).toString("hex");
        const { videoLink, supervisorId,
            workId,workHour,WorkLocation } = req.body;
        const track = await User.findOne({
            trackId
        })
        if (track) {
            return res.status(404).json('Track Already Exist')
        }
        const userss = await User.create(
            {
                trackId, videoLink, supervisorId,
            workId,workHour ,WorkLocation

            })

        res.status(201).json(userss)

    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { postTrackWork }
