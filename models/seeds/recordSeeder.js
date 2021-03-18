//要新建 Record 所以載入進來
const Record = require('../record')
const db = require('../../config/mongoose')

const recordList = require('./recordList').record

// await是無效的code
db.once('open', () => {
    console.log('MongoDB connected record!')
    Record.insertMany(recordList, async (err, docs) => {
        if (err) {
            await console.log(err);
        } else {
            await console.log('儲存成功:', docs)
        }
        db.close(async () => {
            await console.log('db closed')
        })

    })
})