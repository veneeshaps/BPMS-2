const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

const bug = require('./Schema/bug');
const Feature = require('./Schema/feature');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;
const mongoURL= "mongodb+srv://Veneesha:e1EAkL2QiS2ofKvV@cluster0.lx0gvz0.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('Database Connected')).catch(e=>console.log(e));
app.listen(PORT,()=>{
    console.log("Server Started at "+PORT.toString());
});

app.post("/newbug",async(req,res)=>{
    const newbug = await bug.create({...req.body});
    res.send({status:"Bug Added"});
})

app.get("/bugs",async(req,res)=>{
    const bugs = await bug.find({});
    if(bugs){
        res.send({bugs:bugs});
    }else{
        res.send({error:"No Bugs Found"});
    }
})

app.post("/newfeature",async(req,res)=>{
    const newfeature = await Feature.create({...req.body});
    res.send({status:"Feature Added"});
})

app.get("/features",async(req,res)=>{
    const feature = await Feature.find({});
    if(feature){
        res.send({features:feature});
    }else{
        res.send({error:"No Features Found"});
    }
})