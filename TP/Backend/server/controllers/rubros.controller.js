const RubroModel = require("../models/rubros");
const ProductoModel = require("../models/productos");
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
controller.editRubro = (req, res) => {
  const rubro = {
    descripcion: req.body.descripcion,
    url: req.body.url,
  };
  RubroModel.findByIdAndUpdate(req.params.id, { $set: rubro }, { new: true })
    .then(res.json({ status: "Rubro Updated" }))
    .catch((err) => res.json({ status: "error", error: err }));
};

// [BORRADA EN CASCADA] - borra Rubro y todos los productos de ese rubro
controller.deleteRubro = async (req, res) => {
  try {
    await RubroModel.findByIdAndRemove(req.params.id);
    // borro todos los productos de ese rubro.
    await ProductoModel.deleteMany({ "rubro._id": req.params.id });
    res.json({ status: "Rubro deleted" });
  } catch (error) {
    res.json({ mensaje: "Ha ocurrido un error al intentar borrar el rubro", error: error });
  }
};

module.exports = controller;
