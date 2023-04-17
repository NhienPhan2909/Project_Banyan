const Node = require('../models/Node');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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

const updateNode = async (req, res, next) => {
    try {
        const { content, agile_scope, _parentId } = req.body;
        const { node_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(node_id)) {
            return res.status(400).send({ msg: 'Invalid node ID' });
        }

        const node = await Node.findOne({ _id: new ObjectId(node_id) });

        if (!node) {
            return res.status(404).send({ msg: 'Node not found' });
        }

        node.content = content || node.content;
        node.agile_scope = agile_scope || node.agile_scope;
        node._parentId = _parentId || node._parentId;

        const updatedNode = await node.save();

        res.status(200).send(updatedNode);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
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