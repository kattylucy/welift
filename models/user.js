  
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:6,
        max: 255
    },
    email:{
        type:String,
        required: true,
        min: 6
    },
    password:{
        type: String,
        required: true,
        max: 1024
    },
    date:{
        type:Date,
        default: Date.now
    },
    created_workouts: [
        {
            type: Schema.Types.ObjectId,
            ref:'Workout'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);