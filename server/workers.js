const express = require('express')
const workersRouter = express.Router()
let workers = require('./db.js').workers

const validateWorker = (req, res, next) => {
    if ((!Object.keys(req.body).includes('name')) || 
        (!Object.keys(req.body).includes('title')) ||
        (!Object.keys(req.body).includes('salary')) ||
        (!Object.keys(req.body).includes('function')))
        return res.status(400).send(`
            Request malformed. Please make sure that you include name:string, title:string, salary:number, 
            and function:string in the body of your request as json format.
        `)
    if (typeof req.body.name !== 'string') return res.status(400)
        .send('Request malformed. Please make sure that you send name:string.')
    if (typeof req.body.title !== 'string') return res.status(400)
        .send('Request malformed. Please make sure that you send title:string.')
    if (typeof req.body.salary !== 'number') return res.status(400)
        .send('Request malformed. Please make sure that you send salary:number.')
    if (typeof req.body.function !== 'string') return res.status(400)
        .send('Request malformed. Please make sure that you send function:string.')
    next()
}

workersRouter.param('name', (req, res, next) => {
    const name = String(req.params.name.toLowerCase())
    const worker = workers.find(worker => worker.name.toLowerCase() === name)
    const workerIndex = workers.findIndex(worker => worker.name.toLowerCase() === name)
    if (worker) {
        console.log(workers)
        req.worker = worker
        console.log(workers)
        req.index = workerIndex
        console.log(workers)
        next()
    } else {
        res.status(404).send('Worker not found!')
    }
})

workersRouter.get('/', (req, res, next) => {
    res.send(workers)
})
workersRouter.get('/:name', (req, res, next) => {
    res.send(req.worker)
})

workersRouter.post('/', validateWorker, (req, res, next) => {
    const newWorker = req.body
    workers.push(newWorker)
    res.status(201).send(newWorker)
})

workersRouter.put('/:name', validateWorker, (req, res, next) => {
    const updatedWorker = req.body
    workers.splice(req.index, 1, updatedWorker)
    res.send(updatedWorker)
})

workersRouter.delete('/', (req, res, next) => {
    workers = []
    res.status(204).send()
})
workersRouter.delete('/:name', (req, res, next) => {
    workers.splice(req.index, 1)
    res.status(204).send()
})

module.exports = workersRouter