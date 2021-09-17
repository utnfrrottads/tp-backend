const {check, validationResult} = require('express-validator');
const ApiError = require('../error/ApiError');


exports.validateArticleCreate = [


    check('name').isString(),
    check('description').isString(),
    check('presentation').isString(),
    check('notes').isArray(),
    check('prices.*.price').isNumeric(),
    check('prices.*.date').isString(),

    (req, res, next) => {
      
      var errors = validationResult(req);
      if (!errors.isEmpty())
      {
        console.log(errors.array({onlyFirstError: true }))
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      }
      next();
    },
];

exports.validateArticleUpdate = [

    check('name').isString(),
    check('description').isString(),
    check('presentation').isString(),
    check('notes').isArray(),
    check('prices.*.price').isNumeric(),
    check('prices.*.date').isString(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
      {     
        throw ApiError.badVariableType('El valor '+errors.array({onlyFirstError: true })[0].value+' es Invalido');
      }
      next();
    },
];