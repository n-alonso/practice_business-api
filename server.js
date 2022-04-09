const express = require('express')
// Middleware
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const errorhandler = require('errorhandler')
// Endpoint Routers
const minionsRouter = require('./server/minions')
const ideasRouter = require('./server/ideas')
const meetingsRouter = require('./server/meetings')

const app = express()

// Use Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

// Mount Routers
app.use('/minions', minionsRouter)
app.use('/ideas', ideasRouter)
app.use('/meetings', meetingsRouter)

// Use Middleware
app.use(errorhandler())

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

module.exports = app