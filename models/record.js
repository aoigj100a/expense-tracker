//負責和資料庫互動
//1.因為需要使用mongoose的方法 所以載入進來
const mongoose = require('mongoose')
//2.使用mongoose提供的Schema模組 造出物件
const Schema = mongoose.Schema

const RecordSchema = new Schema({
    id: {
        type: Number, 
        unique: true ,
        required: true
      },
      name: {
        type:String,
        unique: true,
        required: true
      },
      category: {
        type:String,
        unique: true,
        required: true
      },
      date: {
        type: Date,
        required: true,
        default: Date.now
        },
      amount: {
        type:String,
        unique: true,
        required: true
      },
})
const Record = mongoose.model('Record', RecordSchema)
module.exports = Record



