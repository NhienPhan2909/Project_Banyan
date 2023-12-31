const { MongoError } = require('mongodb');
const Node = require('../models/Node');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

mongoose.set('strictQuery', false);

//Get for node by id. 
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
    } 
    catch(error) {
        return res.status(400).send({ msg: 'Invalid node structure.' });
    }
    //Save node to database if request contains valid node structure. 
    node.save(function(err, result) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        res.status(200).json({ result });
    });
}

const updateNode = async (req, res, next) => {
    try {
        const { name, content, agile_scope, _childIdList, _parentId } = req.body;
        const { node_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(node_id)) {
            return res.status(400).send({ msg: 'Invalid node ID' });
        }
        //Searches for node in database to update. 
        const node = await Node.findOne({ _id: new ObjectId(node_id) });

        if (!node) {
            return res.status(404).send({ msg: 'Node not found' });
        }

        //Updates values if new value is present, if no new value is present old value is maintained. 
        node.name = name || node.name;
        node.content = content || node.content;
        node.agile_scope = agile_scope || node.agile_scope;
        node._parentId = _parentId || node._parentId;
        node._childIdList = _childIdList || node._childIdList;

        //Save updated node to database. 
        const updatedNode = await node.save();

        res.status(200).send(updatedNode);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
}

// recursive delete function that deletes all child nodes
const _deleteNode = async (node_id, res) => {
    //Finds specified node in database for deletion by the node id. 
    Node.findOne({ _id: node_id }, async function(err, node) {
        const result = new Node(node);

        await Promise.all(result._childIdList.map(_deleteNode));

        Node.deleteOne({ _id: node_id }, function (err, node) {
            if (err) {
                throw new MongoError("Unable to delete node with id" + " " + node_id);
            };
        });
    });
}

const deleteNode = async (req, res, next) => {
    try {
        var node_id = req.params.node_id;

        //Implement recursive delete node on subtree. 
        await _deleteNode(node_id, res);

        res.status(200).send({ msg: 'Successfully deleted the node.' });
    }
    catch(error) {
        res.status(400).send({ msg: error.message});
    }
}

module.exports = {
    findNode, addNode, updateNode, deleteNode
}