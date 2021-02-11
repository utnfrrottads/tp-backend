//Metodos a la BD aqui
const Branch = require('../models/branch');
const ApiError = require('../error/ApiError');
const articlesCtrl = require('./articles.controller');
const branchCtrl = {};


//Controla cuit repetido
branchCtrl.checkCuit = async(cuit, id = ' ') => {
    let branches = await Branch.find({ cuit: cuit }).select('_id');
    if ((await branches).length > 0) {
        (await branches).forEach(branch => {
            if (branch._id.toString() !== id) {
                throw ApiError.badRequest('El cuit de la sucursal se encuentra repetido.');
            }
        })
    }
}

//Método obtener todas las sucursales
branchCtrl.getBranches = async(req, res, next) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (err) {
        next(err)
    }
}

//Método obtener una sola sucursal
branchCtrl.getBranch = async(req, res, next) => {
    try {
        const branch = await Branch.findById(req.params.id);
        res.json(branch);
    } catch (err) {
        next(err)
    }
}

//Método editar una sucursal
branchCtrl.editBranch = async(req, res, next) => {
    try {
        let validations = true;
        const { id } = req.params;
        if (req.body.cuit == "" || req.body.street == "" || req.body.number == "" || req.body.pc == "" || req.body.number == "") {
            next(ApiError.badRequest('Campos incompletos'))
        }
        const branch = {
            cuit: req.body.cuit,
            street: req.body.street,
            number: req.body.number,
            pc: req.body.pc,
            phone: req.body.phone
        };
        await branchCtrl.checkCuit(branch.cuit, id).catch((err) => {
            next(err);
            validations = false;
        });
        if (validations) {
            await Branch.findByIdAndUpdate(req.params.id, { $set: branch }, { new: true });
            res.json({ status: "Sucursal actualizada correctamente" })
        }

    } catch (err) {
        next(err);
    }
}

//Método borrar sucursal
branchCtrl.deleteBranch = async(req, res, next) => {
    try {
        await Branch.findByIdAndRemove(req.params.id);
        res.json({ status: 'Sucursal borrada correctamente' });
    } catch (err) {
        next(err)
    }

}

//Método crear sucursal
branchCtrl.createBranch = async(req, res, next) => {
    try {
        let validations = true;
        const branch = new Branch({
            cuit: req.body.cuit,
            street: req.body.street,
            number: req.body.number,
            pc: req.body.pc,
            phone: req.body.phone
        })
        await branchCtrl.checkCuit(branch.cuit).catch((err) => {
            next(err);
            validations = false;
        })
        if (validations) {
            const branch = new Branch(req.body);
            await branch.save();
            res.json({ status: 'Sucursal creada correctamente' });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = branchCtrl;