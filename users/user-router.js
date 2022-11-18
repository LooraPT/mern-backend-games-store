const Router = require('express').Router;
const router = new Router();
const userController = require('./user-controller')
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware')

router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 20 }), userController.registration)
router.post('/login', body('email').isEmail(), body('password').isLength({ min: 3, max: 20 }), userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

module.exports = router;