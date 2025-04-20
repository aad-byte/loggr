const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true 
    }

}, { timestamps: true });

module.exports = mongoose.model('task', taskSchema); //connects to pluraled name of the collection in database, seconde argument says what type of object this model will change

