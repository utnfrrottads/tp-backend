const {check, validationResult} = require('express-validator');


exports.validateUserCreate = [

    check('dni').isString(),
    check('names').isString(),
    check('lastNames').isString(),
    check('username').isString(),
    check('password').isString(),
    check('email').isEmail(),
    check('pc').isString(),
    check('street').isString(),
    check('number').isString(),
    check('flat').isString(),
    check('phone').isString(),
    check('employee').isBoolean(),
    check('client').isBoolean(),
    check('roles').isArray(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];

exports.validateUserUpdate = [

    check('dni').isString(),
    check('names').isString(),
    check('lastNames').isString(),
    check('username').isString(),
    check('password').isString(),
    check('email').isEmail(),
    check('pc').isString(),
    check('street').isString(),
    check('number').isString(),
    check('flat').isString(),
    check('phone').isString(),
    check('employee').isBoolean(),
    check('client').isBoolean(),
    check('roles').isArray(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];