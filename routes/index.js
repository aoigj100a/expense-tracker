const express = require('express')
const router =  express.Router()

//路由設定開始
const index = require('./modules/index')
// 將網址結構符合 / 字串的 request 導向 index 模組 
router.use('/', index)

const record = require('./modules/record')
// 將網址結構符合 /record 字串的 request 導向 index 模組 
router.use('/record', record)

module.exports = router