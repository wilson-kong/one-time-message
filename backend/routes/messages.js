const express = require('express')
const {
    getMessages,
    getMessage,
    createMessage
} = require('../controllers/messageController')

const router = express.Router()

// routes 
router.get('/', getMessages)
router.get('/:id', getMessage)
router.post('/', createMessage)

module.exports = router