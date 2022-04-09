const express = require('express')
const ideasRouter = express.Router()
const ideas = require('./db.js').ideas

ideasRouter.get('/', (req, res, next) => {
    res.send(ideas)
})

module.exports = ideasRouter