const User = require('../models/user');
const Role = require('../models/role');
const ApiError = require('../error/ApiError');
const UserCtrl = {};

//Metodo GetAll
UserCtrl.getUsers = async(req, res, next) => {
    try {
        const users = await User.find({isActive: true   });

        const roleIds = users.map(x => x.roles).flat(1);

        const roles = await Role.find().where('_id').in(roleIds);

        var result = [];

        users.forEach(user => {

            var userResult = user.toObject();

            userResult.rolesInfo = [];

            userResult.roles.forEach(rolId => {

                const rol = roles.find(x => x._id.toString() == rolId);

                userResult.rolesInfo.push({
                    roleId: rolId,
                    name: rol.name
                });

            });

            result.push(userResult);

        });

        res.json(result);
    } catch (err) {
        next(err);
    }
}

//Metodo GetOne por ID
UserCtrl.getUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

//Controla que DNI sea un Number
UserCtrl.checkValidDNI = async(dni) => {
    if (isNaN(dni)) {
        throw ApiError.badRequest('El DNI ingresado es inválido (no es un número).');
    }
}

//Controla DNI repetido
UserCtrl.checkDNI = async(dni, id = ' ') => {
    let users = await User.find({ dni: dni, isActive: true }).select('_id');
    if (users.length > 0) {
        users.forEach((user) => {
            if (user._id != id) {
                throw ApiError.badRequest('El DNI ingresado ya se encuentra registrado.');
            }
        });
    }
}

//Controla Email repetido
UserCtrl.checkEmail = async(email, id = ' ') => {
    let users = await User.find({ email: email, isActive: true });
    if (users) {
        users.forEach(user => {
            if (user._id != id) {
                throw ApiError.badRequest('El Email ingresado ya se encuentra registrado.');
            }
        });
    }
}

//Controla Nombre de usuario repetido
UserCtrl.checkUserName = async(username, id = ' ') => {
    let users = await User.find({ username: username, isActive:true })
    users.forEach(user => {
        if (user._id != id) {
            throw ApiError.badRequest('El nombre de usuario ya se encuentra registrado.');
        }
    });
}

//Controla Roles existentes
UserCtrl.checkRoles = async(roles) => {
    if (roles.length > 0) {
        let query = await Role.find().select('_id');
        let allRoles = JSON.stringify(query);
        roles.forEach(role => {
            if (!allRoles.includes(role)) {
                throw ApiError.badRequest('El rol ingresado no existe.');
            }
        })
    }
}



//Metodo Create
UserCtrl.createUser = async(req, res, next) => {
    try {
        let validations = true;
        const newUser = new User({
            dni: req.body.dni,
            names: req.body.names,
            lastNames: req.body.lastNames,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            postalCode: req.body.postalCode,
            street: req.body.street,
            number: req.body.number,
            flat: (req.body.flat) ? req.body.flat : '',
            phone: req.body.phone,
            employee: (req.body.employee) ? req.body.employee : false,
            client: (req.body.client) ? req.body.client : false,
            roles: (req.body.roles),
            isActive: true
        });
        await UserCtrl.checkValidDNI(newUser.dni).catch((err) => {
            next(err);
            validations = false;
        });
        await UserCtrl.checkDNI(newUser.dni).catch((err) => {
            next(err);
            validations = false;
        });
        await UserCtrl.checkEmail(newUser.email).catch((err) => {
            next(err);
            validations = false;
        });
        await UserCtrl.checkUserName(newUser.username).catch((err) => {
            next(err);
            validations = false;
        });
        if (req.body.employee) {
            await UserCtrl.checkRoles(req.body.roles).catch((err) => {
                next(err);
                validations = false;
            });
        }else{
            user.roles=[];
        }
        
        if (validations) {
            await newUser.save()
            res.json({ status: 'Usuario guardado correctamente.'});
        }
    } catch (err) {
        next(err);
    }
}

//Metodo Update
UserCtrl.updateUser = async(req, res, next) => {
    try {
        let validations = true;
        const { id } = req.params;

        var user = await User.findById(id);

        if (user == null){
            next(ApiError.badRequest('No se encuentra el usuario'));
            return;
        }

        user.dni = req.body.dni;
        user.names = req.body.names;
        user.lastNames = req.body.lastNames;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.postalCode = req.body.postalCode;
        user.street = req.body.street;
        user.number = req.body.number;
        user.flat = req.body.flat;
        user.phone = req.body.phone;
        user.employee = req.body.employee;
        user.client = req.body.client;
        user.roles = req.body.roles;
        user.isActive = true;

        await UserCtrl.checkValidDNI(user.dni).catch((err) => {
            next(err);
            validations = false;
        });
        await UserCtrl.checkDNI(user.dni, id).catch((err) => {
            next(err);
            validations = false;
        });
        await UserCtrl.checkEmail(user.email, id).catch((err) => {
            next(err);
            validations = false;
        });
        await UserCtrl.checkUserName(user.username, id).catch((err) => {
            next(err);
            validations = false;
        });
        
        if (req.body.employee) {
            await UserCtrl.checkRoles(req.body.roles).catch((err) => {
                next(err);
                validations = false;
            });
        }else{
            user.roles=[];
        }

        if (validations) {
            await User.findByIdAndUpdate(id, { $set: user });
            res.json({ status: 'Usuario Actualizado Correctamente.'});
        }

    } catch (err) {
        next(err);
    }
}

//Metodo Delete (Tiene un parametro para reasignar o no el usuario en caso de que haya que eliminarlo).
UserCtrl.deleteUser = async(req, res, next) => {
    try {
        const {id} = req.params;
        let user = await User.findById(id);
        user.isActive = false;
        await User.findByIdAndUpdate(id, user);
        res.json({status: 'Rol Eliminado Correctamente'});
    } catch (err) {
        next(err);
    }
}

//Metodo Login
/* Parametros -> Los datos se envian en el body de la req, con un metodo post bajo el nombre 'username' y 'password'
Retorna -> Usuario de ser correcto y de lo contrario el status incorrecto */
UserCtrl.checkLogin = async(req, res, next) => {
    try {
        const login = {
            username: req.body.username,
            password: req.body.password,
            isActive: true
        }
        const user = await User.findOne(login);
        if (user) {
            res.json(user);
        } else {
            next(ApiError.loginFailed('Usuario y Contraseña Incorrectos o Usuario Inactivo.'));
        }
    } catch (err) {
        next(err);
    }
}

module.exports = UserCtrl;