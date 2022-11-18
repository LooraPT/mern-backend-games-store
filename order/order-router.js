const Router = require('express').Router;
const router = new Router();
const orderController = require('./order-controller')


router.post('/', orderController.create)
router.get('/', orderController.getOrder)



module.exports = router;