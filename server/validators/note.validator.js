const {check, validationResult} = require('express-validator');


exports.validateNoteCreate = [

    check('name').isString(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];

exports.validateNoteUpdate = [

    check('name').isString(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      next();
    },
];