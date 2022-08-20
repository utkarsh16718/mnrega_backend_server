const { matchedData } = require('express-validator')
const User = require('../../models/employeeRegistration')
const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

const { handleError } = require('../../middleware/utils')
const { emailExists, sendRegistrationEmailMessage } = require('../../middleware/emailer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const registerEmployee = async (req, res) => {
    try {
        const { name, doB, aadharNumber, registrationVideoLink,phone, city, supervisorId,
            empId, workId} = req.body;
        const employeeExists = await User.findOne({
            empId
        })
        if (employeeExists) {
            return res.status(404).json('Employee Already Exist')
        }

        //Code logic for validating S3 bucket
        //Download temp Video:

        
        // const fetch = require('node-fetch');
        // const fs = require('fs');

        // const response = await fetch(registrationVideoLink);
        // const buffer = await response.buffer();

        // fs.writeFile(`./tmpVideos/${empId}.mp4`, buffer, () =>
        //     console.log('finished downloading video!'));

        // //Delete temp video from S3


        // // Upload Renamed video to S3 for Data Set creation
       
       
        // // Delete Everything from local



        // const response = await returnRegisterToken(item, userInfo)
        const userss = await User.create(
            {

                name, doB, aadharNumber,phone, city,
                empId, supervisorId, workId, registrationVideoLink


            })
        console.log(userss)
        console.log(registrationVideoLink)
        //   sendRegistrationEmailMessage(locale, item)
     res.status(201).json(userss)

    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { registerEmployee }
