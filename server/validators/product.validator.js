const {check, validationResult} = require('express-validator');


exports.validateProduct = [

    check('branch').isString(),
    check('article').isString(),
    check('stock.*.quantity').isNumeric(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];