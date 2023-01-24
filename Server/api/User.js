const express = require('express');
const user_model = require('../model/userModel');
const router = express.Router();
const bcrypt = require("bcrypt");

router.post('/register', async (req, res) => {
    if(req.body.username == "" || req.body.email == "" || req.body.password == "") {
        res.json({
            status: "FAILED",
            message: "There was an empty field!"
        });
    } else if (!/^[0-9a-zA-Z ]*$/.test(req.body.username)){
        res.json({
            status: "FAILED",
            message: "Invalid user name!"
        })
    } else if (req.body.username.length < 8){
        res.json({
            status: "FAILED",
            message: "User name is too short!"
        })
    } else if (req.body.username.length > 20){
        res.json({
            status: "FAILED",
            message: "User name is too long!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.email)){
        res.json({
            status: "FAILED",
            message: "Invalid e-mail addres!"
        })
    } else if (req.body.password.length < 6){
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        })
    } else if (req.body.password.length > 20){
        res.json({
            status: "FAILED",
            message: "Password is too long!"
        })
    }else {

        const check = await user_model.checkEmail(req.body.email);
        if (check.rowCount === 0){
            const passhash = await bcrypt.hash(req.body.password, 10);
            const registerResponse = await user_model.postRegister(req.body.username, req.body.email, passhash);
            if(registerResponse){
                res.json("Registration was successfull!");
            }
            else res.json("Something went wrong!");
        }
        else res.json("Email is already taken!");
    }
})

module.exports = router;