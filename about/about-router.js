const aboutController = require('./about-controller');
const Router = require('express').Router;
const router = new Router();
const checkRoleMiddleware = require('../middlewares/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('MANAGER'), aboutController.createAbout)
router.get('/', aboutController.getAllAbout)
router.delete('/:id', checkRoleMiddleware('MANAGER'), aboutController.deleteAbout)
router.put('/:id', checkRoleMiddleware('MANAGER'), aboutController.updateAbout)

module.exports = router;