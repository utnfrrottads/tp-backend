function customersController(Customer) {
  async function get(req, res) {
    const query = {};
    if (req.query.dni) {
      query.dni = req.query.dni;
    }
    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.lastName) {
      query.lastName = req.query.lastName;
    }

    try {
      const customers = await Customer.find(query)
        .populate('purchases.purchaseLines.article')
        .select('-password');

      const returnCustomers = customers.map((customer) => {
        const newCustomer = customer.toJSON();
        newCustomer.links = {
          self: `http://${req.headers.host}/api/customers/${customer._id}`, // eslint-disable-line no-underscore-dangle
        };
        return newCustomer;
      });

      return res.json(returnCustomers);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function post(req, res) {
    const customer = new Customer(req.body);

    if (!customer.password) {
      res.status(400);
      res.send('Password is required');
    }
    if (!customer.username) {
      res.status(400);
      return res.send('Username is required');
    }

    try {
      const savedCustomer = await customer.save();
      res.status(201);
      return res.json(savedCustomer);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return { get, post };
}

module.exports = customersController;
