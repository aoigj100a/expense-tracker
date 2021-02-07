const express = require('express')
const router = express.Router()

const Record =require('../../models/record')
const Category =require('../../models/category')

//路由
router.get('/new', (req, res) => {
    res.render('new')
})
router.post('/new', async (req, res) => {
    // console.log(req.body)
    const count = await Record.countDocuments({}).exec()
    const id = count + 1
    const { name, date, category, amount } = req.body
    return Record.create({ id, name, date, category, amount })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/edit/:id', async (req, res) => {
    const id = req.params.id
    const categoryList = await Category.find().lean().exec()
    Record.findOne({ id: id }).lean()
        .then(record => {
            let _category = ""
            categoryList.forEach((acategory) => {
                if (acategory.cName === record.category) {
                    _category = acategory.cIconCss
                    record.icon = _category
                }
                // console.log(record.icon)
            })
            res.render('edit', { record })
        }).catch(error => console.log(error))
})

router.post('/edit/:id', (req, res) => {
    const id = req.params.id
    const { name, category, amount } = req.body
    // console.log(req.body)
    Record.findOne({ id: id })
        .then(record => {
            record.name = name
            record.category = category
            record.amount = amount
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/delete/:id', (req, res) => {
    // console.log(req.params)
    const id = req.params.id
    Record.findOne({ id: id }).lean()
        .then(Record => res.render('delete', { Record }))
        .catch(error => console.log(error))

})

router.post('/delete/:id', (req, res) => {
    const id = req.params.id
    return Record.findOne({ id: id })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))

})

router.get('/search/:category', (req, res) => {
    res.render('index')
})

module.exports = router