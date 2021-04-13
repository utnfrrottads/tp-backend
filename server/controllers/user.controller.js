const User = require('../models/user');
const Role = require('../models/role');
const Sale = require('../models/sale');
const ApiError = require('../error/ApiError');
const { Mongoose, Schema } = require('mongoose');
const UserCtrl = {};

//Metodo GetAll
UserCtrl.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err){
        next(err);
    }
}

//Metodo GetOne por ID
UserCtrl.getUserById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch(err) {
        next(err);
    }
}

//Controla que DNI sea un Number
UserCtrl.checkValidDNI = async (dni) => {
    if(isNaN(dni)){
        throw ApiError.badRequest('El DNI ingresado es inválido (no es un número).');
    }
}

//Controla DNI repetido
UserCtrl.checkDNI = async (dni,id = ' ') => {
    let users = await User.find({dni: dni}).select('_id');
    if (users.length > 0){
        users.forEach((user) => {
            if(user._id!==id){
                throw ApiError.badRequest('El DNI ingresado ya se encuentra registrado.');
            }
        });
    }
}

//Controla Email repetido
UserCtrl.checkEmail = async (email, id=' ') => {
    let users = await User.find({email: email});
    if(users){
        users.forEach(user => {
            if(user._id!==id){
                throw ApiError.badRequest('El Email ingresado ya se encuentra registrado.');
            }
        });
    }
}

//Controla Nombre de usuario repetido
UserCtrl.checkUserName = async (username, id=' ') => {
    let users = await User.find({username: username})
    users.forEach(user => {
        if(user._id!==id){
            throw ApiError.badRequest('El nombre de usuario ya se encuentra registrado.');
        }
    });
}

//Controla Roles existentes
UserCtrl.checkRoles = async (roles)=> {
    if(roles.length > 0){
        let query = await Role.find().select('_id');
        let allRoles = JSON.stringify(query);
        roles.forEach(role => {
            if(!allRoles.includes(role)){
                throw ApiError.badRequest('El rol ingresado no existe.');
            }
        })
    }
}

//Controla dependencias en otros documentos
UserCtrl.checkDependencies = async (id)=>{
    let query = Sale.find({client: id});
    if((await query).length > 0){
        throw ApiError.badRequest('El usuario que desea eliminar esta asignado a una venta, eliminela o reasignelo para continuar.');
    }
}


UserCtrl.reasignUser= async (id) => {
    const cli = await User.findById(id).lean();
    await Sale.find({client: id}).lean().then(
        sales => {
            sales.forEach( sale => {
                sale.client = null;
                sale.deletedClient = {
                    dni: cli.dni,
                    email: cli.email,
                    phone: cli.phone
                }
                Sale.findByIdAndUpdate(sale._id, {$set: sale}).catch(err => {
                    next(err);
                });
            })
        }
    )
}

//Metodo Create
UserCtrl.createUser = async (req, res, next) => {
    try {
        let validations = true;
        const newUser = new User ({
            dni: req.body.dni,
            names: req.body.names,
            lastNames: req.body.lastNames,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            pc: req.body.pc,
            street: req.body.street,
            number: req.body.number,
            flat: (req.body.flat)?req.body.flat:'',
            phone: req.body.phone,
            employee: (req.body.employee)? req.body.employee : false,
            client: (req.body.client) ? req.body.client : false,
            roles: req.body.roles
        });
        await UserCtrl.checkValidDNI(newUser.dni).catch((err)=>{
            next(err);
            validations = false;
        });
        await UserCtrl.checkDNI(newUser.dni).catch((err)=>{
            next(err);
            validations = false;
        });
        await UserCtrl.checkEmail(newUser.email).catch((err)=>{
            next(err);
            validations = false;
        });
        await UserCtrl.checkUserName(newUser.username).catch((err)=>{
            next(err);
            validations = false;
        });
        await UserCtrl.checkRoles(req.body.roles).catch((err)=>{
            next(err);
            validations = false;
        });
        if(validations){
            await newUser.save()
            res.json('Usuario guardado correctamente.');
        }
    } catch(err){
        next(err);
    }
}

//Metodo Update
UserCtrl.updateUser = async(req, res, next) => {
    try{
        let validations = true;
        const {id} = req.params;
        if(req.body.dni == null || req.body.names == null || req.body.lastNames == null || req.body.username == null || 
            req.body.password == null || req.body.email == null || req.body.pc == null || req.body.street == null || 
            req.body.number == null || req.body.phone == null) 
            {
                next(ApiError.badRequest('Campos incompletos'));
                validations = false;
            }
        const newUser = {
            dni: req.body.dni,
            names: req.body.names,
            lastNames: req.body.lastNames,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            pc: req.body.pc,
            street: req.body.street,
            number: req.body.number,
            flat: req.body.flat,
            phone: req.body.phone,
            employee: req.body.employee,
            client: req.body.client,
            roles: req.body.roles
        }
        await UserCtrl.checkValidDNI(newUser.dni).catch((err)=>{
            next(err);
            validations = false;
        });
        await UserCtrl.checkDNI(newUser.dni, id).catch((err)=>{
            next(err);
            validations = false;
        });
        await UserCtrl.checkEmail(newUser.email, id).catch((err)=>{
            next(err);
            validations = false;
        });
        await UserCtrl.checkUserName(newUser.username,id).catch((err)=>{
            next(err);
            validations = false;
        });
        await UserCtrl.checkRoles(req.body.roles).catch((err)=>{
            next(err);
            validations = false;
        });
        if(validations){
            await User.findByIdAndUpdate(id, {$set: newUser});
            res.json({status: 'Usuario Actualizado Correctamente.'});
        }
    } catch(err){
        next(err);
    }
}

//Metodo Delete (Tiene un parametro para reasignar o no el usuario en caso de que haya que eliminarlo).
UserCtrl.deleteUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        let validations = true;
        await UserCtrl.checkDependencies(id).catch((err)=>{
            if(req.params.reasign === "true"){
                UserCtrl.reasignUser(id);
            } else {
                next(err);
                validations = false;
            }
        });
        if(validations){
            await User.findByIdAndRemove(id);
            res.json({status: 'Usuario Eliminado Correctamente.'});
        }
    } catch(err){
        next(err);
    }
}     

//Metodo Login
/* Parametros -> Los datos se envian en el body de la req, con un metodo post bajo el nombre "username" y "password"
Retorna -> Usuario de ser correcto y de lo contrario el status incorrecto */
UserCtrl.checkLogin = async (req, res, next) => {
    try{
        const login = {
            username: req.body.username,
            password: req.body.password
        }
        const user = await User.findOne(login);
        if(user){
            res.json(user);
        } else {
            next(ApiError.loginFailed('Usuario o Contraseña Incorrectos.'));
        }
    } catch(err){
        next(err);
    }
}

module.exports = UserCtrl;


