const UserModel = require("../models/users");
const ProductoModel = require("../models/productos");
const controller = {};

// trae todos los usuarios
controller.getUsers = async (req, res) => {
  const usuarios = await UserModel.find();
  res.json(usuarios);
};

controller.getUser = (req, res) => {
  UserModel.findById(req.params.id)
    .then((respuesta) => res.json(respuesta))
    .catch((error) => res.json({ error: "No se encuentra el usuario", error: error }));
};

controller.getEmpresas = async (req, res) => {
  const empresas = await UserModel.find({ tipo: "empresa" });
  res.json(empresas);
};

controller.createUser = async (req, res) => {
  //verifico que no haya otro usuario con ese nombre.
  let user = await UserModel.find({ usuario: req.body.usuario });
  if (user.length == 0) {
    user = new UserModel(req.body);
    await user.save();
    res.json({
      status: "ok",
    });
  } else {
    res.json({ status: "fail", error: "Nombre de usuario no disponible." });
  }
};

controller.editUser = async (req, res) => {
  let userEditado = {};
  userEditado.usuario = req.body.usuario;
  userEditado.pass = req.body.pass;
  userEditado.tipo = req.body.tipo;
  userEditado.cuil = req.body.cuil;
  userEditado.nombre = req.body.nombre;
  userEditado.localidad = req.body.localidad;
  userEditado.direccion = req.body.direccion;
  userEditado.telefono = req.body.telefono;
  userEditado.mail = req.body.mail;
  userEditado.url = req.body.url;

  console.log(req.body);

  await UserModel.findByIdAndUpdate(req.params.id, { $set: userEditado }, { new: true });
  res.json({ status: "User Updated" });
};

// [Borrado en cascada]
controller.deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndRemove(req.params.id);
    // Borro todos los productos que vende ese usuario
    await ProductoModel.deleteMany({ idVendedor: req.params.id });
    res.json({ status: "User Deleted" });
  } catch (error) {
    res.json({ mensaje: "Ha ocurrido un error al intentar borrar el usuario", error: error });
  }
};

controller.login = async (req, res) => {
  let user = await UserModel.find({ usuario: req.body.usuario, pass: req.body.password });
  res.json({ user: user });
};

module.exports = controller;
