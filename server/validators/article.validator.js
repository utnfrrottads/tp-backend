const {check, validationResult} = require('express-validator');


exports.validateArticleCreate = [

    check('name').isString(),
    check('description').isString(),
    check('presentation').isString(),
    check('note').isArray(),
    check('price.*.price').isNumeric(),
    check('price.*.date').isDate(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];

exports.validateArticleUpdate = [

    check('name').isString(),
    check('description').isString(),
    check('presentation').isString(),
    check('notes').isArray(),
    check('price.*.price').isNumeric(),
    check('price.*.date').isDate(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];