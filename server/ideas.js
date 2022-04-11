const express = require('express')
const ideasRouter = express.Router()
const ideas = require('./db.js').ideas

const validateIdea = (req, res, next) => {
    if ((!Object.keys(req.body).includes('id')) || 
        (!Object.keys(req.body).includes('name')) ||
        (!Object.keys(req.body).includes('description')) ||
        (!Object.keys(req.body).includes('revenue')))
        return res.status(400).send(`
            Request malformed. Please make sure that you include id:string, name:string, description:string, 
            and revenue:number in the body of your request as json format.
        `)
    if (typeof req.body.id !== 'string') return res.status(400)
        .send('Request malformed. Please make sure that you send id:string.')
    if (typeof req.body.name !== 'string') return res.status(400)
        .send('Request malformed. Please make sure that you send name:string.')
    if (typeof req.body.description !== 'string') return res.status(400)
        .send('Request malformed. Please make sure that you send description:string.')
    if (typeof req.body.revenue !== 'number') return res.status(400)
        .send('Request malformed. Please make sure that you send revenue:number.')
    next()
}

ideasRouter.param('id', (req, res, next) => {
    const id = String(req.params.id.toLowerCase())
    const idea = ideas.find(idea => idea.id.toLowerCase() === id)
    const ideaIndex = ideas.findIndex(idea => idea.id.toLowerCase() === id)
    if (idea) {
        req.idea = idea
        req.index = ideaIndex
        next()
    } else {
        res.status(404).send('Idea not found!')
    }
})

ideasRouter.get('/', (req, res, next) => {
    res.send(ideas)
})
ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea)
})

ideasRouter.post('/', validateIdea, (req, res, next) => {
    const newIdea = req.body
    ideas.push(newIdea)
    res.status(201).send(newIdea)
})

ideasRouter.put('/:id', validateIdea, (req, res, next) => {
    const updatedIdea = req.body
    ideas.splice(req.index, 1, updatedIdea)
    res.send(updatedIdea)
})

ideasRouter.delete('/:id', (req, res, next) => {
    workers.splice(req.index, 1)
    res.status(204).send()
})

module.exports = ideasRouter