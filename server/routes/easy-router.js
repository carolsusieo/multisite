const express = require('express')

const EasyCtrl = require('../controllers/easy-ctrl')

const routere = express.Router()


routere.post('/easy', EasyCtrl.createEasy)
routere.get('/easys',EasyCtrl.getEasys)

module.exports = routere
