const express = require('express');
const mongoose = require('mongoose');
const { router, auth } = require('./routes/auth');
const projectrouter = require('./routes/project');
const chatgptrouter = require('./routes/chatgpt');


const cors = require('cors');
const app = express();
const port = process.env.PORT || 11000;
const prompt = require('./prompt.js');


app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb+srv://admin:admin123@cluster0.ozg5hbu.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.log(err)
    }
});

// create a GET route
app.get('/onboard', (req, res) => {
    res.send({ express: 'onboard page express content' });
});

app.get('/logins', (req, res) => {
    res.send({ express: 'login page express content' });
});

app.get('/signup', (req, res) => {
    res.send({ express: 'signup page express content' });
});

app.get('/dashboard', (req, res) => {
    res.send({ express: 'dashboard page express content' });
});

app.get('/prompt', (req, res) => {
    const prompt_epic_stories = {
        root_id: 1,
        node_id: 1,
        name: "Design e-commerce website",
      };
      
      prompt.initiatePrompt(prompt_epic_stories)
      
    res.send({ express: 'prompt page express content' });
});

app.get('/tree', (req, res) => {
    res.send({ express: 'tree page express content' });
});

app.get('/protected', auth, (req, res) => {
    res.send('This is a protected route.');
});

// POST
app.use('/api', router);
app.use('/projects', projectrouter);
app.use('/chatgpt', chatgptrouter);