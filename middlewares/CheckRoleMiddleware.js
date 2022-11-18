const ApiError = require("../exeptions/api-error");
const tokenService = require("../token/token-service");



module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization;
            if (!token) {
                return next(ApiError.UnauthorizedError())
            }
            const accessToken = token.split(' ')[1]
            const decoded = tokenService.validateAccessToken(accessToken);
            if (!decoded) {
                return next(ApiError.UnauthorizedError())
            }
            let access = false

            for (let i = 0; i < decoded.roles.length; i++) {
                if (decoded.roles[i] === role) {
                    access = true;
                }

            }

            if (!access) {
                return next(ApiError.Forbidden('not access'))
            }

            req.user = decoded;
            next()

        } catch (e) {
            return next(ApiError.Forbidden('not access'))
        }
    }
}