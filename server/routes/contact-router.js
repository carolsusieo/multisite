const express = require('express')

const ContactCtrl = require('../controllers/contact-ctrl')

const routerc = express.Router()


routerc.post('/contact', ContactCtrl.createContact)
routerc.get('/contacts', ContactCtrl.getContacts)


module.exports = routerc
