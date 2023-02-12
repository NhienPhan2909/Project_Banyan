const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RootSchema = new Schema({
    root_id: {
        type: Number,
        required: true,
        unique: true
    },
    node_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = Root = mongoose.model('root', RootSchema);