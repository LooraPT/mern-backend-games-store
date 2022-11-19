const Router = require('express').Router;
const router = new Router();
const genreController = require('./genre-controller')
const checkRoleMiddleware = require('../middlewares/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), genreController.create)
router.get('/', genreController.getAll)
router.put('/', checkRoleMiddleware('ADMIN'), genreController.updateBrand)
router.delete('/', checkRoleMiddleware('ADMIN'), genreController.deleteBrand)

module.exports = router;