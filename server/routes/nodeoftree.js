const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const {connectToDb, getDb, URI} = require('./db')
const Node = require('../models/Node');
const port = process.env.PORT || 9000;

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
app.post('/nodes', async (req, res) => {
    const { node_id, parent_id, child_id_list, content } = req.body;
    if (!node_id || !parent_id ) {
        return res.status(400).send({ error: 'Please provide all required fields' });
    }
    const node = new Node({ node_id, parent_id, child_id_list, content});
    
    try {
        const savedNode = await node.save();
        res.send(savedNode);
    } catch (err) {
        res.status(400).send(err);
    }
});

// GET
app.get('/nodes/:node_id', (req, res) => {
    db.collection('nodes')
     .findOne({node_id: parseInt(req.params.node_id)})
     .then(doc => {res.status(200).json(doc)})
     .catch(err => {res.status(500).json({error: 'Could not fetch the node'})}
    )
})

// DELETE
app.delete('/nodes/:node_id', (req, res) => {
    db.collection('nodes')
     .deleteOne({node_id: parseInt(req.params.node_id)})
     .then(doc => {res.status(200).json(doc)})
     .catch(err => {res.status(500).json({error: 'Could not fetch the node'})})
    // Call to a method to delete all children nodes of the tree in the Node tables
})

// PATCH
app.patch('/nodes/:node_id', (req, res) => {
    const updates = req.body
    db.collection('nodes')
     .updateOne({node_id: parseInt(req.params.node_id)}, {$set: updates})
     .then(result => {res.status(200).json(result)})
     .catch(err => {res.status(500).json({error: 'Could not update the node'})})
})