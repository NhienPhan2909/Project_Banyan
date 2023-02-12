const User = require('../models/User')

const register = (req, res, next) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
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

}

module.exports = {
    register
    }