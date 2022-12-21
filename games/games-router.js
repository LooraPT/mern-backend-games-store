const Router = require('express').Router;
const router = new Router();
const gamesController = require('./games-controller')
const checkRoleMiddleware = require('../middlewares/CheckRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), gamesController.create)
router.delete('/:id', checkRoleMiddleware('ADMIN'), gamesController.delete)
router.get('/', gamesController.getAll)
router.get('/popular', gamesController.popular)
router.get('/:id', gamesController.getOne)


module.exports = router;