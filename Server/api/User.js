const express = require('express');
const user_model = require('../model/userModel');
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require('express-session');
const { cookie } = require('express/lib/response');

router.post('/register', async (req, res) => {
    if(req.body.username == "" || req.body.email == "" || req.body.password == "" || req.body.dateOfBirth == "") {
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
    } else {

        const check = await user_model.checkEmail(req.body.email);
        if (check.rowCount === 0){
            const passhash = await bcrypt.hash(req.body.password, 10);
            const registerResponse = await user_model.postRegister(req.body.username, req.body.email, passhash, req.body.dateOfBirth);
            if(registerResponse){
                res.json("Registration was successfull!");
            }
            else res.json("Something went wrong!");
        }
        else res.json("Email is already taken!");
    }
});

router
    .route("/login")
    .get(async (req, res) => {
        if (req.session.user && req.session.user.username){
            res.json({ loggedIn: true, name: req.session.user.username });
        }else{
            res.json({loggedIn: false});
        }
    })
    .post(async (req, res) => {
        if(req.body.email == "", req.body.password == "") {
            res.json({
                status: "FAILED",
                message: "There was an empty field!"
            });
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.email)){
            res.json({
                status: "FAILED",
                message: "Invalid e-mail addres!"
            })
        } else {
            const results = await user_model.getLogin(req.body.email);
            if(results.rowCount > 0){
                const isSamePass = await bcrypt.compare(
                    req.body.password, 
                    results.rows[0].passhash
                    );
                    if (isSamePass) {
                        req.session.user = {
                            email: req.body.email,
                            id: results.id,
                        };
                        return res.json({loggedIn: true, email: req.body.email, message: "Logged in!"});
                    }else {
                        return res.json({loggedIn: false, message: "Wrog e-mail address or password!" })    
                    }
            } else {        
                return res.json({loggedIn: false, message: "Wrog e-mail address or password!" })
            }
        };
    }   
);

module.exports = router;