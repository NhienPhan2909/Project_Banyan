const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
    node_id: {
        type: Number,
        required: true,
        unique: true
    },
    parent_id: {
        type: Number,
        required: true
    },
    child_id_list: {
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