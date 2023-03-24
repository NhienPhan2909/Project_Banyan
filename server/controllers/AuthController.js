const User = require('../models/User')
const ActivationToken = require('../models/ActivationToken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    var username = req.body.username
    var email = req.body.email
    var password = req.body.password

    User.findOne({ email: email }, function (err, user) {
        // error occur
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        // if email exists in database i.e. email is associated with another user.
        else if (user) {
            return res.status(400).send({ msg: 'This email is already associated with another account.' });
        }
    });

    User.findOne({ username: username }, function (err, user) {
        // if username exists in database i.e. username is associated with another user.
        if (user) {
            return res.status(400).send({ msg: 'This username is already associated with another account.' });
        }
    });

    hashedPass = bcrypt.hashSync(password, 5);
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
    });

    user.save(function (err) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }

        // generate token and save
        var activationToken = new ActivationToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        activationToken.save(function (err) {
            if (err) {
                return res.status(500).send({ msg: err.message });
            }
            else {
                // Send email (use credintials of SendGrid)
                var transporter = nodemailer.createTransport({
                    service: 'gmail', 
                    auth: {
                        user: "aipmshared@gmail.com", 
                        pass: "zrcrkvhepfmagytm" 
                    } 
                });
                url = 'http://localhost:3000'
                var mailOptions = { 
                    from: 'aipmshared@gmail.com', 
                    to: user.email, subject: 'Account Verification Link', 
                    text: 'Hello ' + user.username + ',\n\n' + 'Please verify your account by clicking the link:\n' + url +  '\/api/verify?token=' + activationToken.token + '\n\nThank You!\n'
                    // \nhttp:\/\/' + req.headers.host +  '\/api/verify?token=' + token.token + '\n\nThank You!\n' 
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });
                    }
                    return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                    });
            }
        });
    });
   // return res.status(200).send('User successfully created');
};

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        else if (!user) {
            return res.status(401).send({ msg: 'The user ' + username + ' is not associated with any account. please check and try again!' });
        }
        else if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({ msg: 'Wrong Password!' });
        }
        else if (!user.active) {
            return res.status(401).send({ msg: 'Your Email has not been verified. Please click on resend' });
        }

        const token = generateJWT(user)

        res.status(200).json({ token });
    }); 
}

const verify = (req, res) => {
    var activationToken = req.body.activationToken;
    if (activationToken) {
        try {
            ActivationToken.findOne({ token: activationToken }, function (err, activationToken) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }
                // If token exists in database i.e. token is associated with a user.
                else if (activationToken) {
                    userId = activationToken._userId
                    User.findOne({ _id: userId }, function (err, user) {
                        if (err) {
                            return restart.status(500).send({ msg: err.message });
                        }
                        else if (user) {
                            user.active = true;
                            user.save((err) => {
                                if (err) {
                                  console.log(err);
                                  return;
                                }
                                const token = generateJWT(user);
                                console.log('User is now verified!');
                                //ActivationToken.deleteOne({ token: activationToken });
                                return res.status(200).json({ token });
                              });
                        }
                    });
                }
                else {
                    return res.status(400).send({ msg: 'This token does not have a corresponding account.' });
                }
            });
        } catch (err) {

            console.log(err)
            return res.sendStatus(403)
        }
    } else {
        return res.sendStatus(403);
    }
};

// Verify JWT middleware
const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Missing authorization token' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_secret_key_here');
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid authorization token' });
    }
  };

// Generate JWT
const generateJWT = (user) => {
    const payload = { userId: user.id };
    const options = { expiresIn: '1d' };
    return jwt.sign(payload, 'your_secret_key_here', options);
  };

module.exports = {
    register, login, verify, verifyJWT
}