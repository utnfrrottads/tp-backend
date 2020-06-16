const  User = require('../models/user');
const user = require('../models/user');
const UserCtrl = {};

//Metodo GetAll
UserCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

//Metodo GetOne por ID
UserCtrl.getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    res.json(user);
}

//Metodo Create
UserCtrl.createUser = async (req, res) => {
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
    })
    await newUser.save();
    res.json({status: 'Usuario Guardado Correctamente.'});
}

//Metodo Update
UserCtrl.updateUser = async(req, res) => {
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
    await User.findByIdAndUpdate(id, {$set: newUser});
    res.json({status: 'Usuario Actualizado Correctamente.'});
}

//Metodo Delete
UserCtrl.deleteUser = async (req, res) => {
    const {id} = req.params;
    await User.findByIdAndRemove(id);
    res.json({status: 'Usuario Eliminado Correctamente.'})
}

//Metodo Login
/* Parametros -> Los datos se envian en el body de la req, con un metodo post bajo el nombre "username" y "password"
Retorna -> Usuario de ser correcto y de lo contrario el status incorrecto */
UserCtrl.checkLogin = async (req, res) => {
    const login = {
        username: req.body.username,
        password: req.body.password
    }
    const user = await User.findOne(login);
    if(user){
        res.json(user);
    } else {
        res.json({status: 'Usuario o Contraseña Incorrectos.'})
    }
}

module.exports = UserCtrl;


