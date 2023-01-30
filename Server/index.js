const express = require("express");
const {Server} = require("socket.io");
const helmet = require("helmet");
const userRouter = require("./api/User");
const session = require('express-session');
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const io = new Server();

app.use(helmet());
app.use(express.json());

app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "session_id",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: "auto",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 54 * 7,
        sameSite: "lax",        
    },   
})
);

app.use("/user", userRouter);

server.listen(4000, () => {
    console.log("Server is listening on port 4000!")
});