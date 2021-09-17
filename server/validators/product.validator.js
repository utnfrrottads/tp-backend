const {check, validationResult} = require('express-validator');


exports.validateProductCreate = [

    check('branch').isString(),
    check('article').isString(),
    check('stock.*.quantity').isNumeric(),
    check('stock.*.date').isDate(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];

exports.validateProductUpdate = [

    check('branch').isString(),
    check('article').isString(),
    check('stock.*.quantity').isNumeric(),
    check('stock.*.date').isDate(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];