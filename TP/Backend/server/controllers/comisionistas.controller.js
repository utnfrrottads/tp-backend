const ComisionistaModel = require("../models/comisionistas");
const controller = {};

// trae todos los comisionistas
controller.getComisionistas = async (req, res) => {
  const comisionistas = await ComisionistaModel.find();
  res.json(comisionistas);
};

// traer un comisionista por id.
controller.getComisionista = (req, res) => {
  ComisionistaModel.findById(req.params.id)
    .then((respuesta) => res.json(respuesta))
    .catch((error) => res.json({ mensaje: "No se encuentra el comisionista", error: error }));
};

// crear un comisionista
controller.createComisionista = async (req, res) => {
  const comisionista = new ComisionistaModel(req.body);
  await comisionista.save();
  res.json({
    status: "Comisionista Saved",
  });
};

// edita un comisionista
controller.editComisionista = async (req, res) => {
  const comisionista = {
    nombre: req.body.nombre,
    precio: req.body.precio
  };
  await ComisionistaModel.findByIdAndUpdate(req.params.id, { $set: comisionista }, { new: true });
  res.json({ status: "Comisionista Updated" });
};

// elimina un comisionista
controller.deleteComisionista = (req, res) => {
  ComisionistaModel.findByIdAndRemove(req.params.id)
    .then((req) => res.json({ status: "Comisionista Deleted", request: req }))
    .catch((error) => res.json({ mensaje: "No se encuentra el comisionista para borrar", error: error }));
};

module.exports = controller;
