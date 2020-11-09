const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

let Apply = new Schema({  
    name: String, 
    email: String,
    message: String,
    phone: Number,
});

module.exports = mongoose.model('Apply', Apply);