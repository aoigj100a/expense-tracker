const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
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



