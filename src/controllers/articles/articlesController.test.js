import { expect } from 'chai';
import sinon from 'sinon';
import articlesController from './articlesController';

describe('Articles Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty code on post', async () => {
      const Article = function (article) { // eslint-disable-line func-names
        return article;
      };

      const req = {
        body: {
          description: 'testing article',
          price: { value: 100 },
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = articlesController(Article);
      await controller.post(req, res);

      expect(res.status.args[0][0]).to
        .equal(400, `Bad status ${res.status.args[0][0]}`);
    });
  });
});
