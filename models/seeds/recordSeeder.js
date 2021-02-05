//要新建 Record 所以載入進來
const Record = require('../record')
const db = require('../../config/mongoose')

const recordList = require('./recordList').record

db.once('open',()=>{
    console.log('MongoDB connected record!')
    Record.insertMany(recordList,(err,docs)=>{
        if (err) {
            console.log(err);
        }else{
            console.log('儲存成功:', docs)
        }
        db.close(()=>{
            console.log('db closed')
        })

    })
})