const {check, validationResult} = require('express-validator');


exports.validateNoteCreate = [

    check('name').isAlpha(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];

exports.validateNoteUpdate = [

    check('name').isAlpha(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(412).json({errors: errors.array()});
      next();
    },
];