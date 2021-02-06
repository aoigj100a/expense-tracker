const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const methodOverride = require('method-override')
const Record = require('./models/record')
const Category = require('./models/category')

const app = express()
const port = 3000

//啟動樣版引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.set('useCreateIndex', true);
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//取得db連線
require('./config/mongoose')

//路由設定
app.get('/', async (req, res) => {
    const categoryList = await Category.find().lean().exec()
    Record.find().lean()
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
            res.render('index', { records, totalAmount })
        }).catch(error => console.log(error))

})

app.get('/new', (req, res) => {
    res.render('new')
})
app.post('/new', async (req, res) => {
    // console.log(req.body)
    const count = await Record.countDocuments({}).exec()
    const id = count + 1
    const { name, date, category, amount } = req.body
    return Record.create({ id, name, date, category, amount })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.get('/edit/:id', (req, res) => {
    res.render('edit')
})

app.get('/delete/:id', (req, res) => {
    // console.log(req.params)
    const id = req.params.id
    Record.findOne({ id: id }).lean()
        .then(Record => res.render('delete', { Record }))
        .catch(error => console.log(error))

})

app.post('/delete/:id/y', (req, res) => {
    const id = req.params.id
    return Record.findOne({ id: id })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))

})

app.get('/search/:category', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})