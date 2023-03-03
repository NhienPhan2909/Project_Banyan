const express = require('express');
const RootController = require('../controllers/RootController');

const router = express.Router();

router.post('/add_root', RootController.addRoot)
//router.post('/:root_id', RootController.findRoot)
router.post('/dashboard', RootController.getDashboardRoots)
router.post('/update/:root_id', RootController.updateRoot)
router.post('/delete/:root_id', RootController.deleteRoot)

module.exports = router;