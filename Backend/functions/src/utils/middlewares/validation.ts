import { validationResult } from 'express-validator/check';

/// Checks if there's errors on the parameters
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.mapped(), msg: "Error en alguno de los datos recibidos" });
    }
    next();
}

module.exports = {
    validate
}