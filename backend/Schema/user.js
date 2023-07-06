const mongoose = require('mongoose');
const User = new mongoose.Schema({
    email:{type:String,unique: true},
    password:{type:String},
    type:{type:String}
})
module.exports = mongoose.model("users",User);