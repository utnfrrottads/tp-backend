import reAssign from '../../utils/reAssign';

function customersCustomeridController(Customer) {
  async function findCustomerById(req, res, next) {
    try {
      const customer = await Customer.findById(req.params.customerId)
        .populate('purchases.purchaseLines.article')
        .select('-password');

      if (
        req.loggedUser.userRole !== 'admin' // Admins can see and edit users
        && customer.username !== req.loggedUser.username // One user can modify its own data
      ) {
        return res.sendStatus(403);
      }

      if (customer) {
        req.customer = customer;
        return next();
      }

      return res.sendStatus(404);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  function get(req, res) {
    const { customer } = req;

    const returnCustomer = customer.toJSON();
    const queryString = encodeURI(`?name=${customer.name}&lastName=${customer.lastName}`);
    const dni = encodeURIComponent(customer.dni);
    returnCustomer.links = {
      filterByNameAndLastName: `http://${req.headers.host}/api/customers/${queryString}`,
      filterByDni: `http://${req.headers.host}/api/customers/?dni=${dni}`,
    };

    return res.json(returnCustomer);
  }

  async function put(req, res) {
    const { customer } = req;
    const error = { errors: [] };

    if (!req.body.password) {
      error.errors.push({ password: 'Password is required' });
    }
    if (!req.body.username) {
      error.errors.push({ username: 'Username is required' });
    }
    if (error.errors.length !== 0) {
      res.status(400);
      return res.json(error.errors);
    }
    reAssign(customer, req.body, Customer.schema);

    try {
      const savedCustomer = await customer.save();
      return res.json(savedCustomer);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function patch(req, res) {
    const { customer } = req;

    if (req.body._id) { // eslint-disable-line no-underscore-dangle
      delete req.body._id; // eslint-disable-line no-underscore-dangle
    }
    Object.assign(customer, req.body);

    try {
      const savedCustomer = await customer.save();
      return res.json(savedCustomer);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function remove(req, res) {
    const { customer } = req;

    try {
      await customer.remove();
      return res.sendStatus(204);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return {
    findCustomerById,
    get,
    put,
    patch,
    remove,
  };
}

module.exports = customersCustomeridController;
