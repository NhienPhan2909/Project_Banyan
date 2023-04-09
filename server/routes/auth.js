const express = require('express');
const jwt = require('jsonwebtoken');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/verify', AuthController.verify)

// Route that requires authentication
router.get('/protected', AuthController.verifyJWT, (req, res) => {
    // req.user contains the decoded JWT payload
    res.json({ message: `Hello ${req.user}!` });
  });

const auth = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');
    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        // Set user object on request
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

function protectPage(req, res, next) {
    // check if user is authenticated
    if (!req.user) {
        return res.status(401).json({ msg: 'You must be logged in to access this page' });
    }
    next();
}

module.exports = router;