const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
    parent_id: {
        type: mongoose.ObjectId,
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