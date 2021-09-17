const {check, validationResult} = require('express-validator');


exports.validateRoleCreate = [

    check('name').isString(),
    check('description').isString(),
    check('permissions').isArray(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];

exports.validateRoleUpdate = [

    check('name').isString(),
    check('description').isString(),
    check('permissions').isArray(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];