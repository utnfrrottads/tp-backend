//Metodos a la BD aqui
const Branch = require('../models/branch');
const branchCtrl = {};

//Método obtener todas las sucursales
branchCtrl.getBranches = async(req, res) => {
    const branches = await Branch.find();
    res.json(branches);
}

//Método obtener una sola sucursal
branchCtrl.getBranch = async(req, res) => {
    const branch = await Branch.findById(req.params.id);
    res.json(branch);
}

//Método editar una sucursal
branchCtrl.editBranch = async(req, res) => {
    const branch = {
        cuit: req.body.cuit,
        street: req.body.street,
        number: req.body.number,
        pc: req.body.pc,
        phone: req.body.phone
    };
    await Branch.findByIdAndUpdate(req.params.id, { $set: branch }, { new: true });
    res.json({ status: 'Sucursal actualizada correctamente' });
}

//Método borrar sucursal
branchCtrl.deleteBranch = async(req, res) => {
    await Branch.findByIdAndRemove(req.params.id);
    res.json({ status: 'Sucursal borrada correctamente' });
}

//Método crear sucursal
branchCtrl.createBranch = async(req, res) => {
    const branch = new Branch(req.body);
    await branch.save();
    res.json({ status: 'Sucursal creada correctamente' });
}

module.exports = branchCtrl;