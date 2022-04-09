const express = require('express')
const meetingsRouter = express.Router()
const meetings = require('./db.js').meetings

meetingsRouter.get('/', (req, res, next) => {
    res.send(meetings)
})

module.exports = meetingsRouter