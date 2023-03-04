const express = require('express');
const ProjectController = require('../controllers/ProjectController');

const router = express.Router();

router.post('/add_project', ProjectController.addProject)
router.get('/:id', ProjectController.findOneProject)
router.get('/dashboard', ProjectController.getAllProjects)
// Test with no verification step
//router.get('/dashboard/:userId', ProjectController.getAllProjects)
router.patch('/update/:id', ProjectController.updateProject)
router.delete('/delete/:id', ProjectController.deleteProject)

module.exports = router;