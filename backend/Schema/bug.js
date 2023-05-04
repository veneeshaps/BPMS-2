const mongoose = require('mongoose');
const Bug = new mongoose.Schema({
    name:{type:String},
    description:{type:String},
    priority:{type:String}
})
module.exports = mongoose.model("bugs",Bug);