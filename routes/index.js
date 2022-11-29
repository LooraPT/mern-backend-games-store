const Router = require('express').Router;
const router = new Router();
const userRouter = require('../users/user-router');
const authorRouter = require('../author/author-router');
const genreRouter = require('../genre/genre-router');
const gamesRouter = require('../games/games-router');
const cartRouter = require('../cart/cart-router');
const rolesRouter = require('../roles/roles-router');
const orderRouter = require('../order/order-router');
const checkRoleMiddleware = require('../middlewares/CheckRoleMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');


router.use('/user', userRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);
router.use('/games', gamesRouter);
router.use('/cart', cartRouter);
router.use('/order', AuthMiddleware, orderRouter);
router.use('/roles', checkRoleMiddleware('ADMIN'), rolesRouter);


module.exports = router;



