const {Pool} = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 5432,
});

pool.connect((err) => {
    if (err) {
      console.log("Connect to database... error: ", err);
    } else {
      console.log("Connected to database!");
    }
});

module.exports = pool;