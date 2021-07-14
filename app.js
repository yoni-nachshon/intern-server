const port = process.env.PORT || 5000;
const express = require('express');
var app = express();
const UserToken = require("./model/userToken");
const mongoose = require('mongoose');

const dbPath = "mongodb://127.0.0.1:27017/intern";

console.log('')
mongoose.connect(dbPath);

app.use(require("cors")())
app.use(express.json());

var userRoutes = require('./routes/userRoutes');
app.use("/api/users", userRoutes);
app.get("",(req,res)=>{
    res.status(200).send("welcome")
})
app.listen(port,function(){
    console.log("port:" + port);
})

