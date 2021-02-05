const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  "c-name-ch": {
    type: String,
  },
  "c-name": {
    type: String,
  },
  "c-icon-i": {
    type: String,
  },
  "c-icon-css": {
    type: String,
  },
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category