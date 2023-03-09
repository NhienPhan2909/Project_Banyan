const express = require('express');
const ProjectController = require('../controllers/ProjectController');

const router = express.Router();

router.post('/add-project', ProjectController.addProject)
router.get('/:id', ProjectController.findOneProject)
router.post('/dashboard', ProjectController.getAllProjects)
router.patch('/update/:id', ProjectController.updateProject)
router.delete('/delete/:id', ProjectController.deleteProject)

// Test with no verification step
//router.get('/dashboard/:userId', ProjectController.getAllProjects)

/* Use for POSTMAN test
router.get('/:id', ProjectController.findOneProject)
router.get('/dashboard', ProjectController.getAllProjects)
router.patch('/update/:id', ProjectController.updateProject)
router.delete('/delete/:id', ProjectController.deleteProject)
*/

module.exports = router;