const Employee = require('../../models/user');
const bcrypt = require('bcrypt');
const { handleError } = require('../../middleware/utils')

// const exec = require("child_process").exec;
// const path = require('path');


const spassword = async (password) => {
    try {

        const spasswordhash = await bcrypt.hash(password, 6);
        return spasswordhash;

    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Error in Secure Password"
        })
    }
}

const create = async (req, res) => {
    try {
        const { name,email,superviserId , password } = req.body;
        const employeeExists = await Employee.findOne({
            superviserId
        })

        if (employeeExists) {
            return res.status(404).json( "Supervisor already exists" )}
        const securepassword = await spassword(req.body.password);
        const user=await Employee.create(
            {

                name,email,superviserId,
                password: securepassword
            })
     
            res.status(201).json({"Supervisor Registered":user})

    } catch (error) {
        handleError(res, error)
      }
    }




module.exports = {
    spassword, create
}