const RubroModel = require("../models/rubros");
const controller = {};

// trae todos los rubros
controller.getRubros = async (req, res) => {
  const rubro = await RubroModel.find();
  res.json(rubro);
};

// traer un rubro por id.
controller.getRubro = (req, res) => {
  RubroModel.findById(req.params.id)
    .then((respuesta) => res.json(respuesta))
    .catch((error) => res.json({ mensaje: "No se encuentra el rubro", error: error }));
};

// crear un rubro
controller.createRubro = async (req, res) => {
  const rubro = new RubroModel(req.body);
  await rubro.save();
  res.json({
    status: "Rubro Saved",
  });
};

// edita un rubro
controller.editRubro = async (req, res) => {
  const rubro = {
    descripcion: req.body.descripcion,
  };
  console.log(req.body.descripcion);
  await RubroModel.findByIdAndUpdate(req.params.id, { $set: rubro }, { new: true });
  res.json({ status: "Rubro Updated" });
};

// elimina un rubro
controller.deleteRubro = async (req, res) => {
  await RubroModel.findByIdAndRemove(req.params.id);
  res.json({ status: "Rubro Deleted" });
};



module.exports = controller;
