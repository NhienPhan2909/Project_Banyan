const express = require('express');
const mongoose = require('mongoose');
const SignupRoute = require('./routes/signup')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/signupdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create a GET route
app.get('/onboard', (req, res) => {
    res.send({ express: 'onboard page express content' });
});

app.get('/login', (req, res) => {
    res.send({ express: 'login page express content' });
});

app.get('/signup', (req, res) => {
    res.send({ express: 'signup page express content' });
});

app.get('/dashboard', (req, res) => {
    res.send({ express: 'dashboard page express content' });
});

app.get('/prompt', (req, res) => {
    res.send({ express: 'prompt page express content' });
});

app.get('/tree', (req, res) => {
    res.send({ express: 'tree page express content' });
});

// POST
app.use('/api', SignupRoute)