const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)

module.exports = router


router.get('/auth', authMiddleware, UserController.check)