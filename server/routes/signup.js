const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    try {
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
