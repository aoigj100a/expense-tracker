const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//首頁
// totalAmount 不能輸入負值
router.get('/', async (req, res) => {
    const categoryList = await Category.find().lean().exec()
    Record.find().lean()
        .then(records => {
            let totalAmount = 0
            let category = ""
            records.forEach(record => {
                console.log('record', record)
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
            res.render('index', { records, totalAmount })
        }).catch(error => console.log(error))

})

module.exports = router



