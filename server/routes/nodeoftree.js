const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const {connectToDb, getDb, URI} = require('./db')
const Node = require('../models/Node');
const port = process.env.PORT || 9000;
cors = require('cors')

// init & middleware
const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors())

mongoose.set('strictQuery', false);

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
 
mongoose.connect(URI, { useNewUrlParser: true });
const connection = mongoose.connection;
 
connection.once('open', function() {
    console.log("MongoDB connection established.");
})
 
router.route('/:node_id').get(function(req, res) {
    Node.findOne({node_id: parseInt(req.params.node_id)}, function(err, node) {res.json(node);});
});

router.route('/add').post(function(req, res) {
    let node = new Node(req.body);
    node.save().then(doc => {res.status(200).json({'Node': 'Node added'});})
        .catch(err => {res.status(400).send('Error adding new Node');});
});
 
router.route('/update/:node_id').patch(function(req, res) {
    const updates = req.body
    Node.findOneAndUpdate({node_id: parseInt(req.params.node_id)}, {$set: updates})
        .then(result => {res.status(200).json(result)})
        .catch(err => {res.status(400).send('Could not update the node')});
});
 
router.route('/delete/:node_id').delete(function (req, res) {
    Node.deleteOne({node_id: parseInt(req.params.node_id)}, function(err, node) {
        if(err) res.json(err);
        else res.json('Node removed');
    });
});
 
app.use('/nodes', router);
 
app.listen(port, function() {
    console.log("Server is running. Port: " + port);
});