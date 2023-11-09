const Message = require('../models/messageModel')
const mongoose = require('mongoose')

// get all messages from database
const getMessages = async (req, res) => {
    const messages = await Message.find({}).sort({createdAt: -1})
    res.status(200).json(messages)
}

// get a message by id from database and then deletes it
const getMessage = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'No message with that id'})
    }
    
    // deletes a message from database when found
    const message = await Message.findOneAndDelete({_id: id})
    // for debugging, message is not deleted from databse
    // const message = await Message.findById({_id: id})

    if (!message) {
        return res.status(404).json({msg: 'No message with that id'})
    }
    console.log(message)

    res.status(200).json(message)
}

// create a message and save it to database
const createMessage = async (req, res) => {
    const {text} = req.body
    const msg = text
    try {
        const message = await Message.create({msg})
        const id = message._id.toString()
        res.status(201).json({ link: `${id}`, text: `${msg}`});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = {
    getMessages,
    createMessage,
    getMessage
}