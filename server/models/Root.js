const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RootSchema = new Schema({
    _nodeId: { // id of the root node for this tree
        type: mongoose.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    _userId: {
        type: mongoose.ObjectId,
        required: true
    }
});

module.exports = Root = mongoose.model('root', RootSchema);