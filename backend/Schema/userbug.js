const mongoose = require('mongoose');
const UserBug = new mongoose.Schema({
    usermail:{type:String},
    description:{type:String},
})
module.exports = mongoose.model("userbugs",UserBug);