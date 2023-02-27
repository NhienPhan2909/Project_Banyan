const express = require('express');
const RootController = require('../controllers/RootController');
const port = process.env.PORT || 8000;
const cors = require('cors');

// init & middleware
const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors())

router.post('/add_root', RootController.addRoot)
router.get('/:root_id', RootController.findRoot)
router.patch('/update/:root_id', RootController.updateRoot)
router.delete('/delete/:root_id', RootController.deleteRoot)

app.use('/roots', router);
 
app.listen(port, function() {
    console.log("Server is running. Port: " + port);
});

module.exports = router;