const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const {connectToDb, getDb, URI} = require('./db')
const Root = require('../models/Root');
const port = process.env.PORT || 7000;

// init & middleware
const app = express();
const router = express.Router();
app.use(express.json());

mongoose.set('strictQuery', false);

let db
connectToDb((err) => {
    if (!err) {app.listen(port, () => {console.log(`Listening on port ${port}`)})}
    db = getDb()
})

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// POST
app.post('/roots', async (req, res) => {
    const { root_id, node_id, name } = req.body;
    if (!root_id || !node_id || !name) {
        return res.status(400).send({ error: 'Please provide all required fields' });
    }
    const root = new Root({ root_id, node_id, name });
    try {
        const savedRoot = await root.save();
        res.send(savedRoot);
    } catch (err) {
        res.status(400).send(err);
    }
});

// GET
app.get('/roots/:root_id', (req, res) => {
    db.collection('roots')
     .findOne({root_id: parseInt(req.params.root_id)})
     .then(doc => {res.status(200).json(doc)})
     .catch(err => {res.status(500).json({error: 'Could not fetch the root'})}
    )
})

// DELETE
app.delete('/roots/:root_id', (req, res) => {
    db.collection('roots')
     .deleteOne({root_id: parseInt(req.params.root_id)})
     .then(doc => {res.status(200).json(doc)})
     .catch(err => {res.status(500).json({error: 'Could not fetch the root'})})
    // Call to a method to delete all children nodes of the tree in the Node tables
})

// PATCH
app.patch('/roots/:root_id', (req, res) => {
    const updates = req.body
    db.collection('roots')
     .updateOne({root_id: parseInt(req.params.root_id)}, {$set: updates})
     .then(result => {res.status(200).json(result)})
     .catch(err => {res.status(500).json({error: 'Could not update the document'})})
})
