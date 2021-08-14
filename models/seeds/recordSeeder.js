const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', () => {
  console.log('MongoDB connected recordSeeder!')
  const createUserPromises = []

  const { username, email } = SEED_USER
  createUserPromises.push(
    User.find({ email: SEED_USER.email })
      .then(user => {
        if (user.length !== 0) {
          return
        }
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER.password, salt))
          .then(hash => {
            return User.create({ username, email, password: hash })
          })
      })
  )
  Promise.all(createUserPromises).then(() => {
    const createRecordPromise = []
    createRecordPromise.push(
      User.findOne({ email })
        .then(user => {
          const userId = user._id
          return Record.create(
            {
              userId,
              merchant: '菜市場',
              name: '食材',
              date: '2021-02-03T11:05',
              category: 'food',
              amount: 100

            },
            {
              userId,
              merchant: '牙醫診所',
              name: '看醫生',
              date: '2021-02-04T14:17',
              category: 'home',
              amount: 150
            },
            {
              userId,
              merchant: '綠豆椪餅舖',
              name: '伴手禮',
              date: '2021-02-04T21:03',
              category: 'other',
              amount: 600
            },
            {
              userId,
              merchant: '麵店',
              name: '晚餐',
              date: '2021-02-05T19:30',
              category: 'food',
              amount: 100
            },
            {
              userId,
              merchant: '綠蓋',
              name: '派對汽水',
              date: '2021-02-05T20:00',
              category: 'entertainment',
              amount: 75
            }
          )
        })
    )
    Promise.all(createRecordPromise).then(item => {
      process.exit()
    })
  })
})
