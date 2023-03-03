const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

/*const findRoot = (req, res, next) => {

    Root.findOne( )}, function(err, root) { 
        res.json(root); 
    });
}*/

const getProjects = (req, res, next) => {
    var token = req.body.token;
    // get user id from token
    var user = jwt.verify(token, 'your_secret_key_here').userId;

    Project.find({ _userId: user }, function(err, projects) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        else if (!project) {
            return res.status(400).send({ msg: 'User has no projects.' });
        }

        res.status(200).json({ project });
    })
}

const addProject = (req, res, next) => {
    let root = new Root(req.body);
    root.save().then(doc => {res.status(200).json({'Root': 'Root added'});})
        .catch(err => {res.status(400).send('Error adding new Root');});
}

const updateProject = (req, res, next) => {
    const updates = req.body
    Project.findOneAndUpdate({root_id: parseInt(req.params.root_id)}, {$set: updates})
        .then(result => {res.status(200).json(result)})
        .catch(err => {res.status(400).send('Could not update the root')});
}

const deleteProject = (req, res, next) => {
    Project.deleteOne({root_id: parseInt(req.params.root_id)}, function(err, root) {
        if(err) res.json(err);
        else res.json('Root removed');
    });
}

module.exports = {
    /*findRoot,*/ getProjects, addProject, updateProject, deleteProject
}