const express = require('express');
const NodeController = require('../controllers/NodeController');
const port = process.env.PORT || 9000;
const cors = require('cors');

// init & middleware
const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors())

router.post('/add', NodeController.addNode)
router.get('/:node_id', NodeController.findNode)
router.patch('/update/:node_id', NodeController.updateNode)
router.delete('/delete/:node_id', NodeController.deleteNode)

app.use('/nodes', router);
 
app.listen(port, function() {
    console.log("Server is running. Port: " + port);
});

module.exports = router;