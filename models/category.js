const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  "cNameCh": {
    type: String,
  },
  "cName": {
    type: String,
  },
  "cIconI": {
    type: String,
  },
  "cIconCss": {
    type: String,
  },
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category