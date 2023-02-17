const express = require('express');
const Root = require('../models/Root');
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

const findRoot = (req, res, next) => {
    Root.findOne({root_id: parseInt(req.params.root_id)}, function(err, root) {res.json(root);});
}

const addRoot = (req, res, next) => {
    let root = new Root(req.body);
    root.save().then(doc => {res.status(200).json({'Root': 'Root added'});})
        .catch(err => {res.status(400).send('Error adding new Root');});
}

const updateRoot = (req, res, next) => {
    const updates = req.body
    Root.findOneAndUpdate({root_id: parseInt(req.params.root_id)}, {$set: updates})
        .then(result => {res.status(200).json(result)})
        .catch(err => {res.status(400).send('Could not update the root')});
}

const deleteRoot = (req, res, next) => {
    Root.deleteOne({root_id: parseInt(req.params.root_id)}, function(err, root) {
        if(err) res.json(err);
        else res.json('Root removed');
    });
}

module.exports = {
    findRoot, addRoot, updateRoot, deleteRoot
}