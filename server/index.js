
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const db = require('./db')
db.connectToDB(process.env);
const contactRouter = require('./routes/contact-router')
const signupRouter = require('./routes/signup-router')
const easyRouter = require('./routes/easy-router')
const configRouter = require('./routes/config-router')

const app = express()
//const dotenv = require('dotnet')
//dotenv.config()
const apiPort = process.env.REACT_APP_PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())


app.use('/api/signup',signupRouter)
app.use('/api/contact', contactRouter)
app.use('/api/easy', easyRouter)
app.use('/api/config', configRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
