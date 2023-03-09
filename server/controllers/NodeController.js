const Node = require('../models/Node');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

mongoose.set('strictQuery', false);

const findNode = (req, res, next) => {
    Node.findOne({_id: new ObjectId(req.params.node_id)}, function(err, node) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        else if (!node) {
            return res.status(400).send({ msg: 'Node ID not found.' });
        }
                
        res.status(200).json(node);
    });
}

const addNode = (req, res, next) => {
    var node = new Node();
    try {
        node = new Node(req.body);
    } catch(error) {
        return res.status(400).send({ msg: 'Invalid node structure.' });
    }

    node.save(function(err, result) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }

        res.status(200).json({ result });
    });
}

const updateNode = (req, res, next) => {
    const updates = req.body
    Node.findOneAndUpdate({node_id: parseInt(req.params.node_id)}, {$set: updates})
        .then(result => {res.status(200).json(result)})
        .catch(err => {res.status(400).send('Could not update the node')});
}

// recursive delete function that deletes all child nodes
const _deleteNode = async (node_id) => {
    Node.findOne({ _id: node_id }, async function(err, node) {
        const result = new Node(node);

        await Promise.all(result._childIdList.map(_deleteNode));

        Node.deleteOne({ _id: node_id }, function (err, node) {
            if (err) console.log(err.message);
        });
    });
}

const deleteNode = async (req, res, next) => {
    var node_id = req.params.node_id;

    await _deleteNode(node_id);
    res.status(200).send({ msg: 'Successfully deleted the node.' });
}

module.exports = {
    findNode, addNode, updateNode, deleteNode
}