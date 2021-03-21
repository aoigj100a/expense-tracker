const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
    res.render('new')
})
router.post('/new', (req, res) => {
    const userId = req.user._id
    const { merchant, name, date, category, amount } = req.body
    return Record.create({ userId, merchant, name, date, category, amount })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

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
router.get('/filter', async (req, res) => {
    let year = new Date().getFullYear()
    let month = req.query.month === '月份' ? new Date().getMonth() : req.query.month || new Date().getMonth()
    const date = `${year}-${month}-01`
    const category = req.query.category
    const userId = req.user._id
    const categoryList = await Category.find().lean().exec()
    const records = await Record.find({ userId, category, date: { $gt: date, $lt: `${year}-${month}-31` } }).lean().exec()
    let totalAmount = 0

    if (category === '選擇類別' && month === '月份') return res.redirect('/')

    records.forEach(record => {
        totalAmount += record.amount
        const category = categoryList.find(category => category.cName === record.category)
        record.icon = category.cIconI
    })
    res.render('index', { records, totalAmount, userId, category, month })

})

module.exports = router