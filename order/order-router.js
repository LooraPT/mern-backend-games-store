const Router = require('express').Router;
const router = new Router();
const orderValidate = require('../validators/orderValidate');
const orderController = require('./order-controller')


router.post('/', orderValidate(), orderController.create)
router.get('/', orderController.getOrder)



module.exports = router;