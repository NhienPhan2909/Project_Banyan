const express = require('express');
const ChatGptController = require('../controllers/ChatGptController');

const router = express.Router();

router.post('/start-project', ChatGptController.projectPrompt)
router.post('/expand-node', ChatGptController.expandNode)
// router.post('/update-node', ChatGptController.updateNode)
module.exports = router;
