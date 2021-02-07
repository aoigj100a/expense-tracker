//要新建 Category 所以載入進來
const Category = require('../category')
const db = require('../../config/mongoose')

const categoryList = require('./categoryList.json').category

db.once('open', () => {
    console.log('MongoDB connected category!')
    Category.insertMany(categoryList,async (err, docs)=> {
            if (err) {
                await console.log(err);
            }else{
                await console.log('儲存成功:', docs)
            }
            db.close(async ()=>{
                await console.log('db closed')
            })
        })
})