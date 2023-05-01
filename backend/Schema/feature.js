const mongoose = require('mongoose');
const Feature = new mongoose.Schema({
    name:{type:String},
    status:{type:String},
    description:{type:String}
})
module.exports = mongoose.model("features",Feature);