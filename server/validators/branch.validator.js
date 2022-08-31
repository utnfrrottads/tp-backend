const {check, validationResult} = require('express-validator');
const ApiError = require('../error/ApiError');

exports.validateBranchCreate = [

    check('cuit').isNumeric(),
    check('street').isString(),
    check('number').isString(),
    check('postalCode').isString(),
    check('phone').isNumeric(),


    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];

exports.validateBranchUpdate = [

    check('cuit').isNumeric(),
    check('street').isString(),
    check('number').isString(),
    check('postalCode').isString(),
    check('phone').isNumeric(),


    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];