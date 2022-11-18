const Router = require('express').Router;
const router = new Router();
const gamesController = require('./games-controller')


router.post('/', gamesController.create)
router.put('/', gamesController.update)
router.delete('/', gamesController.delete)
router.get('/', gamesController.getAll)
router.get('/:id', gamesController.getOne)


module.exports = router;