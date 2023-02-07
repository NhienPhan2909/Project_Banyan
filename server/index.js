const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/onboard', (req, res) => {
    res.send({ express: 'onboard page express content' });
});

app.get('/login', (req, res) => {
    res.send({ express: 'login page express content' });
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
