const Router = require('express');
const router = new Router();
const BaseController = require('../controllers/baseController');

router.post('/', BaseController.create)
router.get('/:id', BaseController.getOne)

module.exports = router