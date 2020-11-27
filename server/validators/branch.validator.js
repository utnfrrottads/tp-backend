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
        return res.status(412).json({errors: errors.array()});
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
        return res.status(412).json({errors: errors.array()});
      next();
    },
];