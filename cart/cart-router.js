const Router = require('express').Router;
const router = new Router();
const cartController = require('./cart-controller')

router.post('/', cartController.addToCart)
router.delete('/', cartController.removeItem)
router.get('/', cartController.getAll)

module.exports = router;