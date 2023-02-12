const express = require('express');
const mongoose = require('mongoose');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', AuthController.register)

module.exports = router;
