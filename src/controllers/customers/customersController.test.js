import { expect } from 'chai';
import sinon from 'sinon';
import customersController from './customersController';

describe('Customers Controller Tests:', () => {
  describe('Post:', () => {
    it('Should not allow an empty username on post', () => {
      const Customer = function (customer) { // eslint-disable-line func-names
        return customer;
      };

      const req = {
        body: {
          dni: '12123123',
          password: 'pass',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = customersController(Customer);
      controller.post(req, res);

      expect(res.status.args[0][0]).to
        .equal(400, `Bad status ${res.status.args[0][0]}`);
    });
  });
});
