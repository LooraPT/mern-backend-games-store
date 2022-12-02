const { body, check } = require("express-validator")

module.exports = orderValidate = () => {
    return [
        body('email').isEmail(),
        body('phone').isMobilePhone(),
        check('country', 'Country is required').not().isEmpty(),
        check('city', 'City is required').not().isEmpty(),
        check('street', 'Street is required').not().isEmpty(),
        check('apartment', 'Apartment is required').not().isEmpty(),
        check('house', 'House is required').not().isEmpty(),
    ]
}