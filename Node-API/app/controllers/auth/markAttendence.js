


const NewUser = require('../../models/attendanceDetails')
const crypto = require("crypto");
const { handleError } = require('../../middleware/utils')
const id = crypto.randomBytes(16).toString("hex");



/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const markAttendence = async (req, res) => {
    try {

        const attendanceId = crypto.randomBytes(16).toString("hex");

        // The path to your python script
        var myPythonScript = "C:/Users/utkar/Desktop/Backend_Server/ML_Model/manregaAwsManagement/AWSManagement/getModelPathAndReturnListofIds.py";
        // Provide the path of the python executable, if python is available as environment variable then you can use only "python"
        var pythonExecutable = "python.exe";

        // Function to convert an Uint8Array to a string
        var uint8arrayToString = function (data) {
            return String.fromCharCode.apply(null, data);
        };

        const spawn = require('child_process').spawn;
        const scriptExecution = spawn(pythonExecutable, [myPythonScript, req.body.groupPhotoUrl,attendanceId]);

        // Handle normal output
        scriptExecution.stdout.on('data', (data) => {
            console.log(uint8arrayToString(data));
        });

        // Handle error output
        scriptExecution.stderr.on('data', (data) => {
            // As said before, convert the Uint8Array to a readable string.
            console.log(uint8arrayToString(data));
        });

        scriptExecution.on('exit', (code) => {
            console.log("Process quit with code : " + code);
        });


        const { supervisorId, WorkLocation, workId, groupPhotoUrl } = req.body;
        const attendence = await NewUser.findOne({
            attendanceId
        })
        if (attendence) {
            return res.status(404).json("Attendence ID Already present"
            )

        }

        const attenence = await NewUser.create(
            {


                attendanceId
                , supervisorId, WorkLocation, workId, groupPhotoUrl

            })
        res.status(201).json({ 'Attendence Marked': attenence })
    }


    catch (error) {
        handleError(res, error)
    }
}



module.exports = { markAttendence }
