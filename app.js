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
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
    console.log('mongoDB error!')
})
db.once('open', () => {
    console.log('mongoDB connected!')
})

//路由設定
app.get('/', (req, res) => {
    // res.send('專案初始化1')
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