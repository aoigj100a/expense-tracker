const express = require('express')
const router =  express.Router()
const index = require('./modules/index')
const record = require('./modules/record')
const user = require('./modules/user')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth') 

router.use('/user', user)
router.use('/auth', auth)
router.use('/record', authenticator, record)
router.use('/', authenticator, index)

module.exports = router