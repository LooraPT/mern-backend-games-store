const { body } = require('express-validator');

module.exports = userValidate = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 3 })
    ]
}