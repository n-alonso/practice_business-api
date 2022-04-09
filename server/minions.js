const express = require('express')
const minionsRouter = express.Router()
const minions = require('./db.js').minions

minionsRouter.use('/:name', (req, res, next) => {
    const name = String(req.params.name.toLowerCase())
    const minion = minions.find(minion => minion.name.toLowerCase() === name)
    if (minion) {
        req.minion = minion
        next()
    } else {
        res.status(404).send('Minion not found!')
    }
})

minionsRouter.get('/', (req, res, next) => {
    res.send(minions)
})
minionsRouter.get('/:name', (req, res, next) => {
    res.send(req.minion)
})

minionsRouter.post('/', (req, res, next) => {
    // Need a validateMinion function
})

module.exports = minionsRouter