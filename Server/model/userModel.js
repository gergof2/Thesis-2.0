const express = require('express');
const pool = require('../config/db.js');

class user_model{

    static async checkEmail(email){
        const response = await pool.query("SELECT username FROM users WHERE email = $1", [email]);
        return response;
    }
}

module.exports = user_model;

