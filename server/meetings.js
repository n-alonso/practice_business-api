const express = require('express')
const meetingsRouter = express.Router()
const meetings = require('./db.js').meetings

const validateMeeting = (req, res, next) => {
    if ((!Object.keys(req.body).includes('time')) || 
        (!Object.keys(req.body).includes('day')) ||
        (!Object.keys(req.body).includes('month')) ||
        (!Object.keys(req.body).includes('note')))
        return res.status(400).send(`
            Request malformed. Please make sure that you include time:string, day:number, month:number, 
            and note:string in the body of your request as json format.
        `)
    if (typeof req.body.time !== 'string') return res.status(400)
        .send('Request malformed. Please make sure that you send time:string.')
    if (typeof req.body.day !== 'number') return res.status(400)
        .send('Request malformed. Please make sure that you send day:number.')
    if (typeof req.body.month !== 'number') return res.status(400)
        .send('Request malformed. Please make sure that you send month:number.')
    if (typeof req.body.note !== 'string') return res.status(400)
        .send('Request malformed. Please make sure that you send note:string.')
    next()
}

meetingsRouter.get('/', (req, res, next) => {
    res.send(meetings)
})

meetingsRouter.post('/', validateMeeting, (req, res, next) => {
    const newMeeting = req.body
    meetings.push(newMeeting)
    res.status(201).send(newMeeting)
})

meetingsRouter.delete('/', (req, res, next) => {
    meetings.splice(0, meetings.length)
    res.status(204).send()
})

module.exports = meetingsRouter