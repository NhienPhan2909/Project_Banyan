const express = require('express');
const ProjectController = require('../controllers/ProjectController');

const router = express.Router();

router.post('/add_root', ProjectController.addProject)
//router.post('/:root_id', ProjectController.findProject)
router.post('/dashboard', ProjectController.getProjects)
router.post('/update/:root_id', ProjectController.updateProject)
router.post('/delete/:root_id', ProjectController.deleteProject)

module.exports = router;