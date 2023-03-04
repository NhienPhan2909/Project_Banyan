const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    _rootId: { // id of the root node for this tree
        type: mongoose.ObjectId,
        required: true,
        // Make sure each root only belongs to one project
        unique: true
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

module.exports = Project = mongoose.model('project', ProjectSchema);