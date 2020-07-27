const User = require('../models/user');
const Role = require('../models/role');
const ApiError = require('../error/ApiError');
const role = require('../models/role');
const UserCtrl = {};

//Metodo GetAll
UserCtrl.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err){
        res.json({status: err.message});
    }
}

//Metodo GetOne por ID
UserCtrl.getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch(err) {
        res.json({status: err.message});
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

//Metodo Create
UserCtrl.createUser = async (req, res, next) => {
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
        await newUser.save().catch(err=>next(err));
        res.json('Usuario guardado correctamente.');
    }
}

//Metodo Update
UserCtrl.updateUser = async(req, res, next) => {
    const {id} = req.params;
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
}

//Metodo Delete
UserCtrl.deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        await User.findByIdAndRemove(id);
        res.json({status: 'Usuario Eliminado Correctamente.'})
    } catch(err) {
        res.json({status: err.message});
    }
}

//Metodo Login
/* Parametros -> Los datos se envian en el body de la req, con un metodo post bajo el nombre "username" y "password"
Retorna -> Usuario de ser correcto y de lo contrario el status incorrecto */
UserCtrl.checkLogin = async (req, res) => {
    try{
        const login = {
            username: req.body.username,
            password: req.body.password
        }
        const user = await User.findOne(login);
        if(user){
            res.json(user);
        } else {
            res.json({status: 'Usuario o Contraseña Incorrectos.'});
        }
    } catch(err){
        res.json({status: err.message});
    }
}

module.exports = UserCtrl;


