const ApiError = require('../exceptions/api-error');
const UserModel = require('./user-model');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserDto = require('../dtos/user-dto');
const RoleModel = require('../roles/role-model');
const tokenService = require('../token/token-service')
const CartModel = require('../cart/cart-model')
const OrderModel = require('../order/order-model')
const GamesModel = require('../games/games-model')

class UserService {
    async registration(email, password) {
        try {
            const candidate = await UserModel.findOne({ email });
            if (candidate) {
                throw ApiError.BadRequest(`users with this email ${email} already exists`)
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const activationLink = uuid.v4();
            const userRole = await RoleModel.findOne({ value: 'USER' })
            const user = await UserModel.create({ email, password: hashPassword, activationLink, roles: [userRole.value] });
            const userDto = new UserDto(user);
            const cart = await CartModel.create({ user: userDto.id })
            const tokens = tokenService.generateToken({ ...userDto });
            await tokenService.saveToken(userDto.id, tokens.refreshToken)

            return { ...tokens, user: userDto }
        } catch (e) {
            console.log(e.message)
        }
    }

    async login(email, password) {
        try {
            const user = await UserModel.findOne({ email })
            if (!user) {
                throw ApiError.BadRequest('user is not find')
            }
            const passCheck = await bcrypt.compare(password, user.password)
            if (!passCheck) {
                throw ApiError.BadRequest('incorrect password or email')
            }
            const userDto = new UserDto(user);
            const tokens = tokenService.generateToken({ ...userDto })
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return { ...tokens, user: userDto }
        } catch (e) {
            console.log(e.message)
        }
    }

    async logout(refreshToken) {
        try {
            const token = tokenService.deleteToken(refreshToken)
            return token
        } catch (e) {
            console.log(e.message)
        }
    }


    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }
            const userData = tokenService.validateRefreshToken(refreshToken)
            const tokenDb = await tokenService.findToken(refreshToken)
            if (!userData || !tokenDb) {
                throw ApiError.UnauthorizedError();
            }
            const user = await UserModel.findById(userData.id)
            const userDto = new UserDto(user);
            const tokens = tokenService.generateToken({ ...userDto })
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return { ...tokens, user: userDto }
        } catch (e) {
            console.log(e.message)
        }
    }

    async popularGamesByGenre(id) {
        try {
            const userOrders = await OrderModel.find({ user: id });
            const allGenre = []
            const buyGamesName = [];
            for (let i = 0; i < userOrders.length; i++) {
                const order = userOrders[i];
                for (let j = 0; j < order.gamesId.length; j++) {
                    const game = await GamesModel.findById(order.gamesId[j])
                    if (game?.genreId) {
                        allGenre.push(game.genreId)
                        buyGamesName.push(game.name)
                    }
                }
            }
            allGenre.sort()

            let obj = {};
            for (let i = 0; i < allGenre.length; i++) {
                let key = allGenre[i];
                if (obj[key]) {
                    obj[key]++
                } else {
                    obj[key] = 1;
                }
            }

            let maxCount = 0;
            let maxElement = null;
            for (let key in obj) {
                if (maxCount < obj[key]) {
                    maxCount = obj[key];
                    maxElement = key;
                }
            }

            const result = []
            if (maxElement) {
                const favoriteGames = await GamesModel.find({ genreId: maxElement });
                for (const game of favoriteGames) {
                    result = favoriteGames.filter((game, index) => game.name !== buyGamesName[index])
                }
            }

            if (result) {
                return result
            }

            return null
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserService();