const {check, validationResult} = require('express-validator');
const ApiError = require('../error/ApiError');

exports.validateUserCreate = [

    check('dni').isString(),
    check('names').isString(),
    check('lastNames').isString(),
    check('username').isString(),
    check('password').isString(),
    check('email').isEmail(),
    check('postalCode').isString(),
    check('street').isString(),
    check('number').isString(),
    check('flat').isString(),
    check('phone').isString(),
    check('employee').isBoolean(),
    check('client').isBoolean(),
    check('roles').isArray(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];

exports.validateUserUpdate = [

    check('dni').isString(),
    check('names').isString(),
    check('lastNames').isString(),
    check('username').isString(),
    check('password').isString(),
    check('email').isEmail(),
    check('postalCode').isString(),
    check('street').isString(),
    check('number').isString(),
    check('flat').isString(),
    check('phone').isString(),
    check('employee').isBoolean(),
    check('client').isBoolean(),
    check('roles').isArray(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];