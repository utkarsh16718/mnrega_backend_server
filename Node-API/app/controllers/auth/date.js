const NewUser = require('../../models/attendanceDetails')
// const New = require('../../models/attendanceDetails')

const date = async (req, res) => {
    try {
        // const { empId } = req.query;
        const results=await NewUser.aggregate([
            { $addFields: { dareTime: { $toDate: "$date" } } }, 
            { $sort: { date: 1 } }
          ])
     
        
       
        res.json(results);
        
    }


    catch (error) {
        res.send({
            success: false,
            message: "wrong"
        })
        console.log(error.message)
    }
}
module.exports = { date}