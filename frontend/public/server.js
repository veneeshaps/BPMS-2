const express = require("express");
const path = require("path");
const app = express();

app.get("/",(req,res) => (
    res.sendFile(path.join(__dirname + "/index.html"))
))

const sever = app.listen(5000);
const portNumber = server.adderss().port;
console.log("port: "+ portNumber);