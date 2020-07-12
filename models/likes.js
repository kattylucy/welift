const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;


const likesSchema = new mongoose.Schema({
    workout_id:{
        type: Schema.Types.ObjectId,
        ref:'Workout'
    },
    likes:{
        type:Number,
        default: 0,
    },
    user_ids:{
        type:[String]
    }
  
});

module.exports = mongoose.model('Likes', likesSchema);