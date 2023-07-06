const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

const UserBug = require('./Schema/userbug');
const User = require('./Schema/user');
const bcrypt = require('bcrypt')
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

app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (isPasswordValid) {
        res.send({ usertype: user.type });
      } else {
        res.send({ error: "Invalid login" }); 
      }
    } else {
      res.send({ error: "No user found or invalid login" }); 
    }
  });

app.post("/signup",async(req,res)=>{
    const handleError=(err)=>{
        let errors = {email:""};
        if(err.name === "ValidationError"){
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
              });
        }
        console.log()
        if(err.code === 11000){
            errors.email = "Email is already Registered.";
        }
        return errors;
    }
    try{
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const { email, type } = req.body;
        const newUser = {
        email,
        password: hashedPassword,
        type,
        };
        console.log(newUser)
        const user = await User.create(newUser)
        if (user){
            res.send({usertype:user.type})
        }
    }
    catch(err){
        const errors = handleError(err);
        res.send(errors);
    }
})