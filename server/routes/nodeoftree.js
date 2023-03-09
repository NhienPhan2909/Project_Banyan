const express = require('express');
const NodeController = require('../controllers/NodeController');

const router = express.Router();

router.post('/add-node', NodeController.addNode)
router.get('/:node_id', NodeController.findNode)
router.patch('/update/:node_id', NodeController.updateNode)
router.delete('/delete/:node_id', NodeController.deleteNode)

module.exports = router;