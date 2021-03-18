const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    unique: true,
    required: true
  },
  amount: {
    type: Number,
    unique: true,
    required: true
  },
})
const Record = mongoose.model('Record', RecordSchema)
module.exports = Record



