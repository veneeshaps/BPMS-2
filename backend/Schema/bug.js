const mongoose = require('mongoose');
const Bug = new mongoose.Schema({
    name:{type:String},
    status:{type:String},
    description:{type:String}
})
module.exports = mongoose.model("bugs",Bug);