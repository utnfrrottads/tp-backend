const {check, validationResult} = require('express-validator');


exports.validateProductCreate = [

    check('branch').isString(),
    check('article').isString(),
    check('stock.*.quantity').isNumeric(),
    check('stock.*.date').isDate(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
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
        return res.status(412).json({errors: errors.array()});
      next();
    },
];