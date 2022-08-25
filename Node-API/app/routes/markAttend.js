const markAttend = require("express").Router();
// const fileController = require('./file');
require('dotenv/config');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const crypto = require("crypto");
// const User= require('.././models/registerModel')
const User=require('../models/attendanceDetails')

// const {PythonShell}=require('python-shell')


// });
// const BUCKET = process.env.BUCKET
// const s3 = new aws.S3();


aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,

});
const BUCKET = process.env.BUCKET
// -----------------------------------------------
const s4 = new aws.S3();

//  or

let s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
        secretAccessKey: process.env.ACCESS_SECRET,
        accessKeyId: process.env.ACCESS_KEY,


    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});
//   --------------------------------------------

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})   


markAttend.post('/upload', upload.single('file'), async  (req, res)=>  {
try{
    const attendanceId = crypto.randomBytes(16).toString("hex");
        const { supervisorId, WorkLocation, workId, groupPhotoUrl } = req.body;
        const attendence = await User.findOne({
            attendanceId
        })
        if (attendence) {
            return res.status(404).json("Attendence ID Already present"
            )

        }

        const attenence = await User.create(
            {


                attendanceId
                , supervisorId, WorkLocation, workId, groupPhotoUrl:req.file.location

            })
        res.status(201).json({ 'Attendence Marked': attenence })
    }

catch (error) {
    res.send(error)
}
})

markAttend.get('/', (req, res) => {
    res.send("Welcome to file")
});



module.exports = markAttend
