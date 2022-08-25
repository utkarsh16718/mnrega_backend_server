
require('dotenv/config');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');


aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,

});
const BUCKET = process.env.BUCKET
// -----------------------------------------------
const s4 = new aws.S3();



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





module.exports = upload
