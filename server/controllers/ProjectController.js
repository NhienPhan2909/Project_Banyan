const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

mongoose.set('strictQuery', false);

const findOneProject = (req, res, next) => {
    // COMMENT OUT USER VERIFY STEP TO TEST ON POSTMAN
    /*var token = req.body.token;
    // get user id from token
    var user = jwt.verify(token, 'your_secret_key_here').userId;*/

    Project.findOne({_id: new ObjectId(req.params.id), /*_userId: user*/}, function(err, project) {
        if (err) res.json(err)
        else res.json(project);
    });
}

const getAllProjects = (req, res, next) => {
    var token = req.body.token;
    // get user id from token
    var user = jwt.verify(token, 'your_secret_key_here').userId;

    // Test with no verification step
    //Project.find({_userId: new ObjectId(req.params.userId)}, function(err, projects) {
    Project.find({_userId: user}, function(err, projects) {
        if (err) {
            return res.status(500).send({ msg: err.message });
        }
        else if (!projects) {
            return res.status(400).send({ msg: 'User has no projects.' });
        }

        res.status(200).json({ projects });
    })
}

const addProject = (req, res, next) => {
    let project = new Project(req.body);
    project.save().then(doc => {res.status(200).json({'Project': 'Project added'});})
        .catch(err => {res.status(400).send(err);});
}

const updateProject = (req, res, next) => {
    var token = req.body.token;
    // get user id from token
    var user = jwt.verify(token, 'your_secret_key_here').userId;

    const updates = req.body
    Project.findOneAndUpdate({_id: new ObjectId(req.params.id), _userId: user}, {$set: updates})
        .then(result => {res.status(200).json(result)})
        .catch(err => {res.status(400).send('Could not update the project')});
}

const deleteProject = async (req, res, next) => {
    try {
      // Get the token from the request body or headers
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
  
      // If the token is not provided, return an error
      if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
      }

      // Verify the token and get the payload
      var user = jwt.verify(token, 'your_secret_key_here').userId;
      // Get the project ID from the request URL parameters
      const projectId = req.params.id;
  
      // Find the project with the specified ID and check if the user is authorized to delete it
      const project = await Project.findOne({ _id: projectId, _userId: user});
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Delete the project
      await Project.deleteOne({ _id: projectId });
  
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    findOneProject, getAllProjects, addProject, updateProject, deleteProject
}