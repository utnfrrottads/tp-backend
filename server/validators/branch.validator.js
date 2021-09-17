const {check, validationResult} = require('express-validator');


exports.validateBranchCreate = [

    check('cuit').isString(),
    check('street').isString(),
    check('number').isString(),
    check('pc').isString(),
    check('phone').isNumeric(),


    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];

exports.validateBranchUpdate = [

    check('cuit').isString(),
    check('street').isString(),
    check('number').isString(),
    check('pc').isString(),
    check('phone').isNumeric(),


    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];