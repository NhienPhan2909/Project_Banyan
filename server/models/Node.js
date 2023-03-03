const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
    _parentId: {
        type: mongoose.ObjectId,
        default: null
    },
    _childIdList: {
        type: Array,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    agile_scope: {
        type: String,
        default: null
    }
});

module.exports = Node = mongoose.model('node', NodeSchema);