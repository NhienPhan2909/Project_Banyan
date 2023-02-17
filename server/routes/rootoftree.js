const express = require('express');
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const {connectToDb, getDb, URI} = require('./db')
const Root = require('../models/Root');
const port = process.env.PORT || 7000;
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
 
router.route('/:root_id').get(function(req, res) {
    Root.findOne({root_id: parseInt(req.params.root_id)}, function(err, root) {res.json(root);});
});
 
router.route('/add').post(function(req, res) {
    let root = new Root(req.body);
    root.save().then(doc => {res.status(200).json({'Root': 'Root added'});})
        .catch(err => {res.status(400).send('Error adding new Root');});
});
 
router.route('/update/:root_id').patch(function(req, res) {
    Root.findOne({root_id: parseInt(req.params.root_id)}, function(err, root) {
        if (!root)
            res.status(404).send('There is no data');
        else
            root.root_id = req.body.root_id;
            root.node_id = req.body.node_id;
            root.name = req.body.name;
 
            root.save().then(doc => {res.json('Root updated');})
            .catch(err => {res.status(400).send("Update error");});
    });
});
 
router.route('/delete/:root_id').delete(function (req, res) {
    Root.deleteOne({root_id: parseInt(req.params.root_id)}, function(err, root) {
        if(err) res.json(err);
        else res.json('Root removed');
    });
});
 
app.use('/roots', router);
 
app.listen(port, function() {
    console.log("Server is running. Port: " + port);
});