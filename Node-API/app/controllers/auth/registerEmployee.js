const { matchedData } = require('express-validator')
const User = require('../../models/employeeRegistration')
const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

const { handleError } = require('../../middleware/utils')
const {
  emailExists,
  sendRegistrationEmailMessage
} = require('../../middleware/emailer')
const AWS = require('aws-sdk')
// const fetch = require('node-fetch');
const axios = require('axios')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const registerEmployee = async (req, res) => {
  try {
    const {
      name,
      doB,
      aadharNumber,
      registrationVideoLink,
      phone,
      city,
      supervisorId,
      empId,
      workId
    } = req.body
    const employeeExists = await User.findOne({
      empId
    })
    if (employeeExists) {
      return res.status(404).json('Employee Already Exist')
    }

    // Code logic for validating S3 bucket
    // Download temp Video:

    // // const fs = require('fs');
    // AWS.config.update({
    //   secretAccessKey: process.env.ACCESS_SECRET,
    //   accessKeyId: process.env.ACCESS_KEY,
    //   region: process.env.REGION
    // })
    // // const response = await fetch(registrationVideoLink);
    // const { data: videoBuffer } = await axios.get(registrationVideoLink)

    // const s3 = new AWS.S3()
    // const video = await s3
    //   .putObject({
    //     Key: `${empId}.mp4`,
    //     Body: videoBuffer,
    //     Bucket: process.env.BUCKET
    //   })
    //   .promise()
    // console.log(Object.keys(videoBuffer))
    // console.log(video)

    // const buffer = await response.buffer();
    // fs.mkdir('./tmpVideos')
    // fs.writeFile(`./tmpVideos/${empId}.mp4`, buffer, () =>
    //     console.log('finished downloading video!'));

    // Delete temp video from S3

    // Upload Renamed video to S3 for Data Set creation

    // const fileName = `./tmpVideos/${empId}.mp4`
    // const folderPath = './tmpVideos'

    // AWS.config.update({
    //     secretAccessKey: process.env.ACCESS_SECRET,
    //     accessKeyId: process.env.ACCESS_KEY,
    //     region: process.env.REGION,
    //     signatureVersion: 'v4'
    // })
    // const s3 = new AWS.S3();
    // const date = new Date()
    //     .toISOString()
    //     .split('T')[0]
    //     .replace(/-/g, '/');

    // const originalFileName = fileName.replace(/[^a-zA-Z0-9]/g, '_');
    // const key =
    //     folderPath +
    //     '/' +
    //     date +
    //     '/' +
    //     originalFileName +
    //     '-' +
    //     // uuid() +
    //     '.' +
    //     fileName.split('.')[1];
    //     const url = await s3.getSignedUrlPromise('putObject', {
    //     Bucket: process.env.REGION,
    //     Key: key,
    //     // ContentType: contentType,
    //     Expires: 360
    // });

    // Delete Everything from local

    // const response = await returnRegisterToken(item, userInfo)
    console.log({
      name,
      doB,
      aadharNumber,
      phone,
      city,
      empId,
      supervisorId,
      workId,
      registrationVideoLink
    })
    const userss = await User.create({
      name,
      doB,
      aadharNumber,
      phone,
      city,
      empId,
      supervisorId,
      workId,
      registrationVideoLink
    })

    res.status(201).json(userss)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { registerEmployee }
