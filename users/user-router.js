const Router = require('express').Router;
const router = new Router();
const userController = require('./user-controller')
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/AuthMiddleware');
const userValidator = require('../validators/userValidator');


router.post('/registration', userValidator(), userController.registration)
router.post('/login', userValidator(), userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/popular', authMiddleware, userController.popular)

module.exports = router;