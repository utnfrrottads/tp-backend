const Role = require('../models/role'); //Requiero modelo 

const RoleCtrl = {}; //Creo el objeto controlador

//Metodo GetAll (res= response y req= request)
RoleCtrl.getRoles = async (req, res) => {
    try{
        const roles = await Role.find(); //Busca todos los documentos
        res.json(roles); //Los envio en formato JSON
    } catch(err){
        res.json({status: err})
    }
}

//Metodo Create
RoleCtrl.createRole = async (req, res) => {
    try{
        const role = new Role({ //Creo el nuevo rol con los parametros enviados en el request (sin ID porque lo da la BD)
            name: req.body.name,
            description: req.body.description,
            permissions: req.body.permissions
        });
        await role.save(); //Guardo en la BD (y espero que finalice)
        res.json({status: 'Rol Guardado Correctamente'}) //Devuelvo resultado correcto
    } catch(err){
        res.json({status: err})
    }
}

//Metodo GetOne
RoleCtrl.getRole = async (req, res) => {
    try{
        const {id} = req.params; //Consigo el ID mando por parametro en el get
        const role = await Role.findById(id); //Busco por ID
        res.json(role); //Lo envío
    } catch(err){
        res.json({status: err})
    }
}

//Metodo Update
RoleCtrl.updateRole = async (req, res) => {
    try{
        const {id} = req.params;
        const newRole = {
            name: req.body.name,
            description: req.body.description,
            permissions: req.body.permissions
        }
        await Role.findByIdAndUpdate(id, {$set: newRole});
        res.json({status: 'Rol Actualizado Correctamente'});
    } catch(err){
        res.json({status: err})
    }
}

//Metodo Delete
RoleCtrl.deleteRole = async (req, res) => {
    try{
        const {id} = req.params;
        await Role.findByIdAndRemove(id);
        res.json({status: 'Rol Eliminado Correctamente'});
    } catch(err){
        res.json({status: err})
    }
}

//Exporto el controlador para requerirlo en otro lado
module.exports = RoleCtrl;