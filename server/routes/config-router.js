const express = require('express')

const ConfigCtrl = require('../controllers/config-ctrl')

const routerd = express.Router()


//routerd.post('/config', ConfigCtrl.createConfig)
routerd.put('/config', ConfigCtrl.updateConfig)
routerd.get('/config', ConfigCtrl.getConfig)
routerd.get('/configs',ConfigCtrl.getConfigs)
routerd.post('/config',ConfigCtrl.createConfig)
routerd.delete('/config',ConfigCtrl.deleteConfig)

module.exports = routerd
