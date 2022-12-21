const Router = require('express').Router;
const router = new Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const orderValidate = require('../validators/orderValidate');
const orderController = require('./order-controller')


router.post('/', AuthMiddleware, orderValidate(), orderController.create)
router.get('/', orderController.getOrder)



module.exports = router;