const express = require('express');
const UserCtrl = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', UserCtrl.getUsers);
userRouter.get('/:id', UserCtrl.getUserById);
userRouter.post('/', UserCtrl.createUser);
userRouter.put('/:id', UserCtrl.updateUser);
userRouter.delete('/:id/:reasign', UserCtrl.deleteUser);
userRouter.post('/login', UserCtrl.checkLogin);

module.exports = userRouter;