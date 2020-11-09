const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

let Jobs = new Schema({  
    jobName: String, 
    jobType: String,
    jobWages: Number,
    firstDescription: String,
    description: String,
    dateStart: Date,
    dateEnd: Date, 
    company: {
        name: String,
        address: String,
    },
});

module.exports = mongoose.model('Jobs', Jobs);