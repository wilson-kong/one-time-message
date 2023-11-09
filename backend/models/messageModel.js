const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create a schema for messages
const messageSchema = new Schema({
    msg: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema)