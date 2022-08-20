
const NewUser = require('../../models/attendanceDetails')
const NewEmp = require('../../models/employeeRegistration')
const { handleError } = require('../../middleware/utils')

const getMyEmployeesAttendence = async (req, res) => {
    try {
        const { workId, supervisorId
            // ,dateTime
         } = req.query;

        // let modifiedDate= new Date(dateTime);
        // modifiedDate=modifiedDate.toISOString();

       

            const attendence = await NewUser.find({
                $and: [
                   { workId},
                   { supervisorId}
                //    ,{dateTime}

                ]
           }).select("presentemployeeIds");

          let empDetails= await Promise.all( attendence.map( (att)=>{
            return Promise.all( att.presentemployeeIds.map(async (id)=>{
                console.log(typeof(id))
                    let details = await NewEmp.findOne({empId:id});
                    console.log("before",details)
                    return details
                }))
            }))

        if (empDetails) {
        //     NewUser.aggregate([
        //         {
        //             $lookup:
        //             {
        //                 from: "employees",
        //                 localField: "presentemployeeIds",
        //                 foreignField: "empId",
        //                 as: "employees"
        //             }
        //         }
        //     ])

            res.status(201).json(empDetails[0].filter((emp)=>{
                if(emp){
                    return emp
                }
            }))

        }
        else {
            res.status(404).json("Indvalid EmployeeId")
        }

    }

    catch (error) {
        handleError(res, error)
    }

}
module.exports = { getMyEmployeesAttendence }