function purchasesController(Customer) {
  async function get(req, res) {
    const query = { _id: req.params.customerId };

    try {
      const purchases = await Customer.find(query).select('purchases');
      res.json(purchases);
    } catch (err) {
      res.status(503);
      res.send(err);
    }
  }

  return { get };
}

module.exports = purchasesController;
