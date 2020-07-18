const express = require('express');
const UserCtrl = require('../controllers/user.controller');
const userRouter = express.Router();
const userValidator = require('../validators/user.validator'); 

userRouter.get('/', UserCtrl.getUsers);
userRouter.get('/:id', UserCtrl.getUserById);
userRouter.post('/', userValidator.validateUserCreate, UserCtrl.createUser);
userRouter.put('/:id', userValidator.validateUserUpdate, UserCtrl.updateUser);
userRouter.delete('/:id', UserCtrl.deleteUser);
userRouter.post('/login', UserCtrl.checkLogin);

module.exports = userRouter;