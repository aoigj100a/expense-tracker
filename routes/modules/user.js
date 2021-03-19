const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }
    User.findOne({ email }).then(user => {
        // 如果已經註冊：退回原本畫面
        if (user) {
            errors.push({ message: '這個 Email 已經註冊過了。' })
            res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword
            })
        } else {
            // 如果還沒註冊：寫入資料庫
            // 加鹽
            // 1.產生「鹽」，並設定鹹度為 10 
            // 2.使用者密碼「加鹽」，產生雜湊值
            // 3.用雜湊值取代原本的使用者密碼
            return bcrypt
                .genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({
                    name,
                    email,
                    password: hash 
                }))
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        }

    })
})

router.get('/login', (req, res) => {
    req.flash("warning_msg", "有帳號請登入帳號，無帳號請註冊，感恩。")
    res.render('login')
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout()
    req.flash("success_msg", "你已成功登出")
    res.redirect('/user/login')
})

module.exports = router