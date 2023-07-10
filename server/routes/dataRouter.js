const Router = require('express');
const router = new Router();
const DataController = require('../controllers/dataController');

router.post('/get', DataController.getData)
router.post('/count', DataController.getCountData)

module.exports = router