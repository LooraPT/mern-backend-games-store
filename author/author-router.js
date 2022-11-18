const Router = require('express').Router;
const router = new Router();
const authorController = require('./author-controller')
const checkRoleMiddleware = require('../middlewares/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), authorController.create)
router.get('/', authorController.getAll)
router.put('/', checkRoleMiddleware('ADMIN'), authorController.updateType)
router.delete('/', checkRoleMiddleware('ADMIN'), authorController.deleteType)

module.exports = router;