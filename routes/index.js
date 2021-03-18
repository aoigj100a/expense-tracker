const express = require('express')
const router =  express.Router()
const index = require('./modules/index')
const record = require('./modules/record')
const user = require('./modules/user')

router.use('/', index)
router.use('/record', record)
router.use('/user', user)

module.exports = router