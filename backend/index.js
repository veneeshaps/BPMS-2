const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

const UserBug = require('./Schema/userbug');
const User = require('./Schema/user');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;
const mongoURL = "mongodb+srv://Veneesha:e1EAkL2QiS2ofKvV@cluster0.lx0gvz0.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('Database Connected')).catch(e=>console.log(e));

app.listen(PORT,()=>{
    console.log("Server Started at "+PORT.toString());
});

app.get("/bugreport",async(req,res)=>{
    const bugs = await UserBug.find({});
    res.send({bugs:bugs});
})

app.post("/userbug",async(req,res)=>{
    const userbug = await UserBug.create({...req.body});
    res.send({status:"Bug Added"});
})
app.post("/login",async(req,res)=>{
    const user = await User.find({...req.body});
    if (user){
        res.send({usertype:user.type})
    }
    else {
        res.send({error:"no user found"})
    }
})
app.post("/signup",async(req,res)=>{
    const user = await User.create({...req.body})
    if (user){
        res.send({usertype:user.type})
    }
    else {
        res.send({error:"role not added"})
    }
})