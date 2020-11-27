const {check, validationResult} = require('express-validator');


exports.validateRoleCreate = [

    check('name').isString(),
    check('name').isString(),
    check('permissions').isString(),


    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];

exports.validateRoleUpdate = [

    check('name').isString(),
    check('name').isString(),
    check('permissions').isString(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];