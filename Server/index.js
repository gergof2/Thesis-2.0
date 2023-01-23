const express = require("express");
const {Server} = require("socket.io");
const helmet = require("helmet");
const conn = require('./config/db');

const app = express();
const server = require("http").createServer(app);
const io = new Server();

app.use(helmet());
app.use(express.json());

server.listen(4000, () => {
    console.log("Server is listening on port 4000!")
});