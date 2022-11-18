const jwt = require('jsonwebtoken')
const tokenModel = require('./token-model')

class TokenService {
    generateToken(data) {
        const accessToken = jwt.sign(data, process.env.ACCESS_KEY, { expiresIn: '30m' })
        const refreshToken = jwt.sign(data, process.env.REFRESH_KEY, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({ user: userId, refreshToken })
        return token
    }

    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.ACCESS_KEY);
            return userData;
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.REFRESH_KEY);
            return userData;
        } catch (e) {
            return null
        }
    }

    async deleteToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken })
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({ refreshToken })
        return tokenData
    }
}

module.exports = new TokenService();