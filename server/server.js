const express = require('express');
const mongoose = require('mongoose');
const authrouter = require('./routes/auth');
const projectrouter = require('./routes/project');
const chatgptrouter = require('./routes/chatgpt');
const noderouter = require('./routes/nodeoftree');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 11000;

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

// Path strings for routers
app.use('/api', authrouter);
app.use('/projects', projectrouter);
app.use('/chatgpt', chatgptrouter);
app.use('/nodes', noderouter);