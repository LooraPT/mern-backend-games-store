const ApiError = require("../exceptions/api-error");
const tokenService = require("../token/token-service");



module.exports = function (req, res, next) {
    try {
        const authorizationToken = req.headers.authorization;
        if (!authorizationToken) {
            return next(ApiError.UnauthorizedError())
        }
        const bearer = authorizationToken.split(' ')[0];
        if (bearer !== 'Bearer') {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationToken.split(' ')[1];
        if (!accessToken || !bearer) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}