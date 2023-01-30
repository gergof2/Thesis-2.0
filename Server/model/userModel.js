const express = require('express');
const pool = require('../config/db.js');

class user_model{

    static async checkEmail(email){
        const response = await pool.query("SELECT username FROM users WHERE email = $1", [email]);
        return response;
    }

    static async postRegister(user_name, email, passhash, dateOfBirth){
        let date_time = new Date();
        const response = await pool.query("INSERT INTO users(username, email, passhash, points, dateofbirth, createDate) VALUES ($1, $2, $3, 0, $4, $5)",
         [user_name, email, passhash, dateOfBirth, (date_time.getFullYear() + "-" + ("0" + (date_time.getMonth() + 1)).slice(-2) + "-" + ("0" + date_time.getDate()).slice(-2))]);
        return response;
    }

    static async getLogin(email){
        const response = await pool.query("SELECT id, username, email, passhash FROM users WHERE email = $1", [email]);
        return response;
    }

}

module.exports = user_model;

