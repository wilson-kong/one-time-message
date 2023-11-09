const express = require('express');
const messageRoutes = require('./routes/messages')

const app = express();

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// for routes
app.use('/api/messages', messageRoutes)

module.exports = app;