const express = require('express')
const app = express()
const config = require('./config')
const db = require('./db')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

db.connect()

app.use('/api/auth', require('./controllers/auth/auth.routes'))

module.exports = app