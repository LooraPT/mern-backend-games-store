const Router = require('express').Router;
const router = new Router();
const gamesController = require('./games-controller')
const checkRoleMiddleware = require('../middlewares/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), gamesController.create)
router.put('/', checkRoleMiddleware('ADMIN'), gamesController.update)
router.delete('/', checkRoleMiddleware('ADMIN'), gamesController.delete)
router.get('/', gamesController.getAll)
router.get('/:id', gamesController.getOne)


module.exports = router;