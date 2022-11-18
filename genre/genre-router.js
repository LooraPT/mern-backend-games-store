const Router = require('express').Router;
const router = new Router();
const brandController = require('./genre-controller')
const checkRoleMiddleware = require('../middlewares/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
router.get('/', brandController.getAll)
router.put('/', checkRoleMiddleware('ADMIN'), brandController.updateBrand)
router.delete('/', checkRoleMiddleware('ADMIN'), brandController.deleteBrand)

module.exports = router;