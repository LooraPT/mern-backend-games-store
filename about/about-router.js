const aboutController = require('./about-controller');
const Router = require('express').Router;
const router = new Router();

router.post('/', aboutController.createAbout)
router.get('/', aboutController.getAllAbout)
router.delete('/', aboutController.deleteAbout)
router.put('/', aboutController.updateAbout)

module.exports = router;