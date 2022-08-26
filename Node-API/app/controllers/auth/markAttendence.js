const NewUser = require('../../models/attendanceDetails')
const crypto = require('crypto')
const { handleError } = require('../../middleware/utils')
// const id = crypto.randomBytes(16).toString("hex");

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const markAttendence = async (req, res) => {
  try {
    const attendanceId = crypto.randomBytes(16).toString('hex')
    const { supervisorId, WorkLocation, workId, groupPhotoUrl } = req.body
    const attenence = await NewUser.create(
      { attendanceId, supervisorId, WorkLocation, workId, groupPhotoUrl },
      (err, docs) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Result : ', docs)
          // The path to your python script
          const myPythonScript =
            '/home/anon/Documents/GitHub/mnrega_backend_server/ML_Model/recognizeEmployee.py'
          // Provide the path of the python executable, if python is available as environment variable then you can use only "python"
          const pythonExecutable = 'python3'

          // Function to convert an Uint8Array to a string
          const uint8arrayToString = function (data) {
            return String.fromCharCode.apply(null, data)
          }

          const spawn = require('child_process').spawn
          console.log(groupPhotoUrl)
          const scriptExecution = spawn(
            pythonExecutable,
            [myPythonScript, groupPhotoUrl, attendanceId],
            { detached: true }
          )

          // Handle normal output
          scriptExecution.stdout.on('data', (data) => {
            console.log(uint8arrayToString(data))
          })

          // Handle error output
          scriptExecution.stderr.on('data', (data) => {
            // As said before, convert the Uint8Array to a readable string.
            console.log(uint8arrayToString(data))
          })

          scriptExecution.on('exit', (code) => {
            console.log(`Process quit with code : ${code}`)
          })
        }
      }
    )
    res.status(201).json({ 'Attendence Marked': attenence })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { markAttendence }
