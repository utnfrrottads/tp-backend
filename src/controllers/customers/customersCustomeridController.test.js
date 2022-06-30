import { expect } from 'chai';
import sinon from 'sinon';
import customersCustomeridController from './customersCustomeridController';

describe('Customers/Customerid Controller Tests:', async () => {
  describe('Function findCustomerById', () => {
    const req = {
      params: { customerId: 1 },
    };
    const next = () => {};
    const res = {
      send: sinon.spy(),
      sendStatus: sinon.spy(),
      status: sinon.spy(),
    };

    it('Should return an 404 status code when customerId doesn\'t exist', async () => {
      const Customer = {
        findById: () => {
          const promise = new Promise((resolve) => {
            resolve(null);
          });
          return {
            populate: () => {
              const select = {
                select: () => promise,
              };
              return select;
            },
          };
        },
      };

      const controller = customersCustomeridController(Customer);
      await controller.findCustomerById(req, res, next);

      expect(res.sendStatus.args[0][0]).to
        .equal(404, `Bad status ${res.sendStatus.args[0][0]}`);
    });

    it('Should return an 503 status code when database fails', async () => {
      const Customer = {
        findById: () => {
          const promise = new Promise((resolve, reject) => {
            reject(new Error({ error: 'cannot reach database' }));
          });
          return {
            populate: () => {
              const select = {
                select: () => promise,
              };
              return select;
            },
          };
        },
      };

      const controller = customersCustomeridController(Customer);
      await controller.findCustomerById(req, res, next);

      expect(res.status.args[0][0]).to
        .equal(503, `Bad status ${res.status.args[0][0]}`);
    });
  });
});
