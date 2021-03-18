const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')

const app = express()
const port =  process.env.PORT || 3000

app.engine('hbs', exphbs({
    defaultLayout: 'main', extname: '.hbs', helpers: {
        eq: function (a, b) {
            return a === b
        },
    },
}))

app.set('view engine', 'hbs')

mongoose.set('useCreateIndex', true);
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  }))

require('./config/mongoose')

usePassport(app)
app.use(routes)

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})