const Router = require('express').Router;
const router = new Router();
const userRouter = require('../users/user-router');
const authorRouter = require('../author/author-router');
const genreRouter = require('../genre/genre-router');
const gamesRouter = require('../games/games-router');
const cartRouter = require('../cart/cart-router');
const rolesRouter = require('../roles/roles-router');
const orderRouter = require('../order/order-router');
const checkRoleMiddleware = require('../middlewares/CheckRoleMiddleware')


router.use('/user', userRouter);
router.use('/type', authorRouter);
router.use('/brand', genreRouter);
router.use('/item', gamesRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/roles', checkRoleMiddleware('ADMIN'), rolesRouter);


module.exports = router;



