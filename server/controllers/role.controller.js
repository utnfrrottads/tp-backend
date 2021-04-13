const Role = require('../models/role'); //Requiero modelo 
const User = require('../models/user');
const ApiError = require('../error/ApiError');
const user = require('../models/user');
const role = require('../models/role');

const RoleCtrl = {}; //Creo el objeto controlador

//Controla dependencias
RoleCtrl.checkDependencies = async (id) => {
    let query = await user.find({roles: id});
    if(query.length > 0){
        throw ApiError.badRequest('El rol que desea eliminar se encuentra vinculado a algún usuario, revise la dependencia');
    }
}

//Controla nombre repetido
RoleCtrl.checkName = async (name, id = ' ')=>{
    let roles = await Role.find({name: name}).select('_id');
    if((await roles).length > 0){
        (await roles).forEach(role => {
            if(role._id !== id){
                throw ApiError.badRequest('El nombre del rol se encuentra repetido.');
            }
        })
    }
}


//Metodo GetAll (res= response y req= request)
RoleCtrl.getRoles = async (req, res, next) => {
    try{
        const roles = await Role.find(); //Busca todos los documentos
        res.json(roles); //Los envio en formato JSON
    } catch(err){
        next(err)
    }
}

//Metodo Create
RoleCtrl.createRole = async (req, res, next) => {
    try{
        let validations = true;
        const role = new Role({ //Creo el nuevo rol con los parametros enviados en el request (sin ID porque lo da la BD)
            name: req.body.name,
            description: req.body.description,
            permissions: req.body.permissions
        });
        await RoleCtrl.checkName(role.name).catch((err)=>{
            next(err);
            validations = false;
        })
        if(validations){
            await role.save();
            res.json({status: 'Rol Guardado Correctamente'}); //Guardo en la BD (y espero que finalice)
        }
    } catch(err){
        next(err);
    }
}

//Metodo GetOne
RoleCtrl.getRole = async (req, res, next) => {
    try{
        const {id} = req.params; //Consigo el ID mando por parametro en el get
        const role = await Role.findById(id); //Busco por ID
        res.json(role); //Lo envío
    } catch(err){
        next(err);
    }
}

//Metodo Update
RoleCtrl.updateRole = async (req, res, next) => {
    try{
        let validations = true;
        const {id} = req.params;
        if(req.body.name == null || req.body.description == null || req.body.pemissions == null) {
            next(ApiError.badRequest('Campos incompletos'))
        }
        const newRole = {
            name: req.body.name,
            description: req.body.description,
            permissions: req.body.permissions
        }
        await RoleCtrl.checkName(newRole.name, id).catch((err)=>{
            next(err);
            validations = false;
        });
        if(validations){
            await Role.findByIdAndUpdate(id, {$set: newRole});
            res.json({status: 'Rol Actualizado Correctamente'});
        }
    } catch(err){
        next(err);
    }
}

//Metodo Delete
RoleCtrl.deleteRole = async (req, res, next) => {
    try{
        let validations = true;
        const {id} = req.params;
        await RoleCtrl.checkDependencies(id).catch((err)=> {
            next(err);
            validations = false;
        })
        if(validations){
            await Role.findByIdAndRemove(id);
            res.json({status: 'Rol Eliminado Correctamente'});
        }
    } catch(err){
        next(err);
    }
}

//Exporto el controlador para requerirlo en otro lado
module.exports = RoleCtrl;