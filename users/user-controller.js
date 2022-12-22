const userService = require("./user-service");
const { validationResult } = require('express-validator');
const ApiError = require("../exceptions/api-error");


class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('incorrect password or email', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (e) {
            console.log(e.message)
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('incorrect password or email', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            console.log(e.message)
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            console.log(e.message)
            next(e);
        }
    }


    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            console.log(e.message)
            next(e);
        }
    }

    async popular(req, res, next) {
        try {
            const { id } = req.user;
            const favoriteGenre = await userService.popularGamesByGenre(id)
            return res.json(favoriteGenre)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()