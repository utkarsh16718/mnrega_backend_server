
const AttendenceSchema = require('../../models/attendanceDetails')
const { handleError } = require('../../middleware/utils')


// 

const getAttendence = async (req, res) => {
    try {
        const { empId } = req.query
        // const attendence = await AttendenceSchema.aggregate([{ $match: { 'presentemployeeIds':{
        //     $contains:1
        const attendence = await AttendenceSchema.find({ presentemployeeIds: { $all: [empId] } }).select("dateTime");

        if (attendence) {


            res.status(201).json(attendence)
            
        }
        else {
            res.status(404).json("Indvalid EmployeeId")

        }
    }
    catch (error) {
        handleError(res, error)
    }
}
module.exports = { getAttendence }