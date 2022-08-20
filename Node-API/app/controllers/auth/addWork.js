const { matchedData } = require('express-validator')
const User = require('../../models/workDetails')
// const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

const { handleError } = require('../../middleware/utils')
// const { emailExists, sendRegistrationEmailMessage } = require('../../middleware/emailer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const addWork = async (req, res) => {
    try {
        // Gets locale from header 'Accept-Language'
        // const locale = req.getLocale()
        // req = matchedData(req)
        const { workId, workDesciption, workLocation, supervisorId
        } = req.body;
        const workExists = await User.findOne({
            workId
        })
        if (workExists) {
            return res.status(404).json('Work Already Added')
        }

        const Work=await User.create(
            {

                workId, workDesciption, workLocation, supervisorId


            })

            res.status(201).json(Work)


    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { addWork }
