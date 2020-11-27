const {check, validationResult} = require('express-validator');

exports.validateSaleCreate = [

    check('transactionNumber').isNumeric(),
    check('pc').isString(),
    check('date').isDate(),
    check('street').isString(),
    check('number').isString(),
    check('client').isString(),
    check('cart.*.product').isString(),
    check('cart.*.quantity').isNumeric(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];

exports.validateSaleUpdate = [

    check('transactionNumber').isNumeric(),
    check('pc').isString(),
    check('date').isDate(),
    check('street').isString(),
    check('number').isString(),
    check('client').isString(),
    check('cart.*.product').isString(),
    check('cart.*.quantity').isNumeric(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];