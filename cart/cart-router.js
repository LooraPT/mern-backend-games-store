const Router = require('express').Router;
const router = new Router();
const cartController = require('./cart-controller')
const authMiddleware = require('../middlewares/AuthMiddleware')

router.post('/', authMiddleware, cartController.addToCart)
router.delete('/', authMiddleware, cartController.removeItem)
router.get('/', authMiddleware, cartController.getAll)

module.exports = router;