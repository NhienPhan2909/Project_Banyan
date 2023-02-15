const User = require('../models/User')
const bcrypt = require('bcryptjs')


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 5, function(err, hashedPass) {
        if(err) {
            res.json({
                error : err
            })
        }
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        user.save()
            .then(user => {
                res.json({
                    message: 'user added successfully'
                    })
            })
            .catch(error => {
                res.json({
                    message: 'error in adding user'
                })
            })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    User.findOne({username: username}).then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result){
                if(result) {
                    res.json({
                        message: 'Login Successful'
                    })
                }
                else {
                    res.json({
                        message: 'Password does not match'
                    })
                }
            })
        }
        else {
            res.json({
                message: 'No user found',
                error : err
            })
        }
    }) 
}

module.exports = {
    register, login
}