const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
// const methodOverride = require('method-override')

const app = express()
const port = 3000

//啟動樣版引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//安置靜態資源
app.use(express.static('public'))

//取得db連線
require('./config/mongoose')

//路由設定
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.get('/edit', (req, res) => {
    res.render('edit')
})

app.get('/delete', (req, res) => {
    res.render('delete')
})

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})