//Metodos a la BD aqui
const Sale = require('../models/sale');
const saleCtrl = {};

//M�todo obtener todas las ventas
saleCtrl.getSales = async (req, res) => {
    const sales = await Sale.find();
    res.json(sales);
}

//M�todo obtener una venta
saleCtrl.getSale = async (req, res) => {
    const sale = await Sale.findOne(req.params.id);
    res.json(sale);
}

//M�todo crear venta
saleCtrl.createSale = async (req, res) => {
    const sale = new Sale(req.body);
    await sale.save();
    res.json({ status: 'Venta creada' });
}

//M�todo borrar venta
saleCtrl.deleteSale = async (req, res) => {
    await findByIdAndRemove(req.params.id);
    res.json = ({ status: 'Venta eliminada'})
}

//M�todo modificar venta
saleCtrl.updateSale = async (req, res) => {
    const sale = {
        pc: req.body.pc,
        date: req.body.date,
        street: req.body.street,
        number: req.body.number,
        client: req.body.client,
        card: req.body.card
    }
    saleCtrl.findByIdAndUpdate(req.params.id, { $set: sale }, { new: true });
    re.json({ status: 'Venta actualizada' });
}

module.exports = saleCtrl;