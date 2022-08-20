
const Employee = require('../../models/user');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { superviserId, password } = req.body;
    try {
        const login = await Employee.findOne({
            superviserId
        })

        if (login) {
            const passwordmatch = await bcrypt.compare(password, Employee.password);
           
            if (passwordmatch) {
                res.send({
                    message: "Password correct"
                })
            }
            else {
                res.send({
                    message: "Password Incorrect"
                })
            }
        }
        else {
            res.send({
                // success: false,
                message: "Invalid User and Password"
            })
        }

    } catch (error) {
        res.send({
            // success: false,
            message: "Invalid"
        })
    }

}
module.exports = {
    login
  
}