import bcrypt from 'bcryptjs';

function customersLoginController(Customer) {
  function get(req, res) { // get current user
    if (req.session.loggedUser) {
      return res.json(req.session.loggedUser);
    }
    return res.sendStatus(404);
  }

  async function post(req, res) { // log in
    const { body: { username, password } } = req;

    try {
      const customer = await Customer.findOne({ username })
        .select('-purchases -carts');

      const passwordMatch = await bcrypt.compare(password, customer.password);

      if (passwordMatch) {
        customer.password = undefined;
        req.session.loggedUser = customer;
        return res.json(customer);
      }

      res.status(403);
      return res.json({ errors: [{ customer: 'Incorrect username or password' }] });
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return { get, post };
}

module.exports = customersLoginController;
