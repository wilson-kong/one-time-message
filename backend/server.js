require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./app')

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
    console.log(error)
})