const express = require('express')
const router =  express.Router()
const index = require('./modules/index')
const record = require('./modules/record')

router.use('/', index)
router.use('/record', record)

module.exports = router