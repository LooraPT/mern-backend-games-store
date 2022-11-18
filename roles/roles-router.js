const rolesController = require('./roles-controller');

const Router = require('express').Router;
const router = new Router();




router.post('/create', rolesController.createRole)
router.post('/give', rolesController.giveRole)
router.delete('/', rolesController.deleteRole)
router.get('/', rolesController.getAllRoles)

module.exports = router;