const Role = require('../models/role'); //Requiero modelo 
const ApiError = require('../error/ApiError');


const RoleCtrl = {}; //Creo el objeto controlador


RoleCtrl.getRoleID = async(req, res, next) => {
    const { role } = req.params
    let roleID = await Role.findOne({name: role}).select('_id')
    res.json(roleID._id)
}

//Controla nombre repetido
RoleCtrl.checkName = async(name, id = ' ') => {
    let roles = await Role.find({ name: name, isActive: true }).select('_id');
    if ((await roles).length > 0) {
        (await roles).forEach(role => {
            console.log(role._id,id);
            if (role._id.toString() !== id) {
                throw ApiError.badRequest('El nombre del rol se encuentra repetido.');
            }
        })
    }
}


//Metodo GetAll (res= response y req= request)
RoleCtrl.getRoles = async(req, res, next) => {
    try {
        const roles = await Role.find({isActive: true}); //Busca todos los documentos
        res.json(roles); //Los envio en formato JSON
    } catch (err) {
        next(err)
    }
}

//Metodo Create
RoleCtrl.createRole = async(req, res, next) => {
    try {
        let validations = true;
        const role = new Role({ //Creo el nuevo rol con los parametros enviados en el request (sin ID porque lo da la BD)
            name: req.body.name,
            description: req.body.description,
            permissions: req.body.permissions,
            isActive: true
        });
        await RoleCtrl.checkName(role.name).catch((err) => {
            next(err);
            validations = false;
        })
        if (validations) {
            await role.save();
            res.json({ status: 'Rol Guardado Correctamente' }); //Guardo en la BD (y espero que finalice)
        }
    } catch (err) {
        next(err);
    }
}

//Metodo GetOne
RoleCtrl.getRole = async(req, res, next) => {
    try {
        const { id } = req.params; //Consigo el ID mando por parametro en el get
        const role = await Role.findById(id); //Busco por ID
        res.json(role); //Lo envío
    } catch (err) {
        next(err);
    }
}

//Metodo Update
RoleCtrl.updateRole = async(req, res, next) => {
    try {
        let validations = true;
        const { id } = req.params;
        const newRole = {
            name: req.body.name,
            description: req.body.description,
            permissions: req.body.permissions,
            isActive: true
        }
        await RoleCtrl.checkName(newRole.name, id).catch((err) => {
            next(err);
            validations = false;
        });
        if (validations) {
            await Role.findByIdAndUpdate(id, { $set: newRole });
            res.json({ status: 'Rol Actualizado Correctamente' });
        }
    } catch (err) {
        next(err);
    }
}

//Metodo Delete
RoleCtrl.deleteRole = async(req, res, next) => {
    try {
        const {id} = req.params;
        let role = await Role.findById(id);
        role.isActive = false;
        await Role.findByIdAndUpdate(id, role);
        res.json({status: 'Rol Eliminado Correctamente'});
    } catch (err) {
        next(err);
    }
}

//Exporto el controlador para requerirlo en otro lado
module.exports = RoleCtrl;