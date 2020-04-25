const { check, validationResult } = require('express-validator');

validation = {}

validation.user = [
    check('firstName')
        .isLength({ min:1 }).withMessage('First Name is a required field.')
        .isAlphanumeric().withMessage('First name must be alphanumeric.'),
    check('lastName')
        .isLength({ min:1 }).withMessage('Last Name is a required field.')
        .isAlphanumeric().withMessage('Last must be alphanumeric.'),
    check('emailAddress')
        .isEmail().withMessage(`Email must be formatted email@email.com`),
    check('password')
        .isLength({ min:4 }).withMessage('Password must be at least 4 characters in length.')
]

validation.course = [
    check('title')
        .isLength({ min:1 }).withMessage('Title required field.'),
    check('description')
        .isLength({ min:1 }).withMessage('Description is a required field.')
]

module.exports = validation