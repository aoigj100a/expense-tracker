const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//首頁
// totalAmount 不能輸入負值
router.get('/', async (req, res) => {
    const categoryList = await Category.find().lean().exec()
    const userId = req.user._id
    Record.find({ userId }).lean()
        .then(records => {
            let totalAmount = 0
            let category = ""
            records.forEach(record => {
                totalAmount += record.amount
                categoryList.forEach(
                    (categories) => {
                        if (categories.cName == record.category) {
                            category = categories.cIconI
                            record.icon = category
                            return category
                        }
                    }
                )
            })
            res.render('index', { records, totalAmount, userId })
        }).catch(error => console.log(error))

})

module.exports = router



