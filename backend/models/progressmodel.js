const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyProgress = new Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('progress', dailyProgress); 
