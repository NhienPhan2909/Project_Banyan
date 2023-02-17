const express = require('express');
const Node = require('../models/Node');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const {connectToDb, getDb, URI} = require('../routes/db')
const cors = require('cors');

mongoose.set('strictQuery', false);
const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(URI, { useNewUrlParser: true });
const connection = mongoose.connection;
 
connection.once('open', function() {
    console.log("MongoDB connection established.");
})

const findNode = (req, res, next) => {
    Node.findOne({node_id: parseInt(req.params.node_id)}, function(err, node) {res.json(node);});
}

const addNode = (req, res, next) => {
    let node = new Node(req.body);
    node.save().then(doc => {res.status(200).json({'Node': 'Node added'});})
        .catch(err => {res.status(400).send('Error adding new Node');});
}

const updateNode = (req, res, next) => {
    const updates = req.body
    Node.findOneAndUpdate({node_id: parseInt(req.params.node_id)}, {$set: updates})
        .then(result => {res.status(200).json(result)})
        .catch(err => {res.status(400).send('Could not update the node')});
}

const deleteNode = (req, res, next) => {
    Node.deleteOne({node_id: parseInt(req.params.node_id)}, function(err, node) {
        if(err) res.json(err);
        else res.json('Node removed');
    });
}

module.exports = {
    findNode, addNode, updateNode, deleteNode
}