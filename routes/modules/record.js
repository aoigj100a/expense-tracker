const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
    res.render('new')
})
router.post('/new', (req, res) => {
    const userId = req.user._id
    const { name, date, category, amount } = req.body
    return Record.create({ userId, name, date, category, amount })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// 打造登入系統之後 修改功能與刪除功能都要修正
router.get('/:id/edit', async (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const categoryList = await Category.find().lean().exec()
    Record.findOne({ _id, userId }).lean()
        .then(record => {
            let _category = ""
            categoryList.forEach((acategory) => {
                if (acategory.cName === record.category) {
                    _category = acategory.cIconCss
                    record.icon = _category
                }
            })
            res.render('edit', { record })
        }).catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const { name, category, amount } = req.body

    Record.findOne({ _id, userId })
        .then(record => {
            record.name = name
            record.category = category
            record.amount = amount
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id/delete', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Record.findOne({ _id, userId }).lean()
        .then(Record => res.render('delete', { Record }))
        .catch(error => console.log(error))

})

router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))

})

//篩選器
router.get('/', async (req, res) => {
    const categoryList = await Category.find().lean().exec()
    const filter = req.query.category
    if (!filter) return res.redirect('/')
    Record.find({ category: filter })
        .lean()
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

            res.render('index', { records, totalAmount, filter })
        })
        .catch(error => console.log(error))
})

module.exports = router