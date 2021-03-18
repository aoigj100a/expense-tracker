const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
    // 初始化 Passport 模組
    app.use(passport.initialize())
    app.use(passport.session())
    // 設定本地登入策略
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // 1.根據email去找到使用者
        // 2.判斷user 是否相符
        // 3.判斷密碼 （還要判斷使用者輸入的內容加鹽後是否相符）
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered!' })
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Email or Password incorrect.' })
                }
                return done(null, user)
            })
            .catch(err => done(err, false))
        //序列反序列
        passport.serializeUser((user, done) => {
            done(null, user.id)
        })
        passport.deserializeUser((id, done) => {
            User.findById(id)
                .lean()
                .then(user => done(null, user))
                .catch(err => done(err, null))
        })
    }))
}