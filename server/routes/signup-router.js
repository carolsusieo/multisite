const express = require('express')

const SignupCtrl = require('../controllers/signup-ctrl')

const router = express.Router()


router.post('/signup', SignupCtrl.createSignup)
router.get('/signups', SignupCtrl.getSignups)


module.exports = router
