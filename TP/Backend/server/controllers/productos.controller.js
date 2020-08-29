const ProductoModel = require("../models/productos");
const controller = {};

controller.getProductos = async (req, res) => {
  const producto = await ProductoModel.find();
  res.json(producto);
};

controller.getProductosByRubro = async (req, res) => {
  const product = await ProductoModel.find({'rubro._id': req.params.id_rubro});
  res.json(product);
}

controller.getProductosByEmpresa = async (req, res) => {
  const product = await ProductoModel.find({'idVendedor': req.params.id_vendedor});
  res.json(product);
}


controller.getProductosByDescripcion = async (req, res) => {
  await ProductoModel.find({nombre:{$regex: new RegExp(req.params.desc),'$options' : 'i'}}, function(err, data) {
    res.json(data);
  });
}



controller.getProducto = (req, res) => {
  ProductoModel.findById(req.params.id)
    .then((respuesta) => res.json(respuesta))
    .catch((error) => res.json({ mensaje: "No se encuentra el producto", error: error }));
};

controller.createProducto = async (req, res) => {
  const producto = new ProductoModel(req.body);
  await producto.save();
  res.json({
    status: "Producto Saved",
  });
};

controller.editProducto = async (req, res) => {
  const producto = {
    nombre: req.body.nombre,
    rubro: req.body.rubro,
    idVendedor: req.body.idVendedor,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    precio: req.body.precio,
    url: req.body.url,
  };

  try {
    await ProductoModel.findByIdAndUpdate(req.params.id, { $set: producto }, { new: true });
    res.json({ status: "Proct updated" });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

controller.deleteProducto = (req, res) => {
  ProductoModel.findByIdAndRemove(req.params.id)
    .then((req) => res.json({ status: "Product Deleted", request: req }))
    .catch((error) => res.json({ mensaje: "No se encuentra el producto para borrar", error: error }));
};

module.exports = controller;
