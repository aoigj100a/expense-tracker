const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 首頁
// totalAmount 不能輸入負值
router.get('/', async (req, res) => {
  const userId = req.user._id
  const categoryList = await Category.find().lean().exec()
  const records = await Record.find({ userId }).lean().exec()
  let totalAmount = 0

  records.forEach(record => {
    totalAmount += record.amount
    const category = categoryList.find(category => category.cName === record.category)
    record.icon = category.cIconI
  })
  res.render('index', { records, totalAmount, userId })
})

module.exports = router
