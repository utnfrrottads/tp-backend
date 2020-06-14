const Role = require('../models/role'); //Requiero modelo 

const RoleCtrl = {}; //Creo el objeto controlador

//Metodo GetAll (res= response y req= request)
RoleCtrl.getRoles = async (req, res) => {
    console.log('Paso por aqui');
    const roles = await Role.find(); //Busca todos los documentos
    console.log(roles);
    res.json(roles); //Los envio en formato JSON
}

//Metodo Create
RoleCtrl.createRole = async (req, res) => {
    const role = new Role({ //Creo el nuevo rol con los parametros enviados en el request (sin ID porque lo da la BD)
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions
    });
    await role.save(); //Guardo en la BD (y espero que finalice)
    res.json({status: 'Rol Guardado Correctamente'}) //Devuelvo resultado correcto
}

//Metodo GetOne
RoleCtrl.getRole = async (req, res) => {
    const {id} = req.params; //Consigo el ID mando por parametro en el get
    const role = await Role.findById(id); //Busco por ID
    res.json(role); //Lo envío
}

//Metodo Update
RoleCtrl.updateRole = async (req, res) => {
    const {id} = req.params;
    const newRole = {
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions
    }
    await Role.findByIdAndUpdate(id, {$set: newRole});
    res.json({status: 'Rol Actualizado Correctamente'});
}

//Metodo Delete
RoleCtrl.deleteRole = async (req, res) => {
    const {id} = req.params;
    await Role.findByIdAndRemove(id);
    res.json({status: 'Rol Eliminado Correctamente'});
}

//Exporto el controlador para requerirlo en otro lado
module.exports = RoleCtrl;