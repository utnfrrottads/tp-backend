import { expect } from 'chai';
import sinon from 'sinon';
import articlesArticleidController from './articlesArticleidController';

describe('Articles/Articleid Controller Tests:', () => {
  describe('Function findArticleById', () => {
    const req = {
      params: { articleId: 1 },
    };
    const next = () => {};
    const res = {
      send: sinon.spy(),
      sendStatus: sinon.spy(),
      status: sinon.spy(),
    };

    it('Should return an 404 status code when articleId doesn\'t exist', async () => {
      const Article = {
        findById: () => {
          const promise = new Promise((resolve) => {
            resolve(null);
          });
          const slice = {
            slice: () => promise,
          };
          return slice;
        },
      };

      const controller = articlesArticleidController(Article);
      await controller.findArticleById(req, res, next);

      expect(res.sendStatus.args[0][0]).to
        .equal(404, `Bad status ${res.sendStatus.args[0][0]}`);
    });

    it('Should return an 503 status code when database fails', async () => {
      const Article = {
        findById: () => {
          const promise = new Promise((resolve, reject) => {
            reject(new Error({ error: 'cannot reach database' }));
          });
          const slice = {
            slice: () => promise,
          };
          return slice;
        },
      };

      const controller = articlesArticleidController(Article);
      await controller.findArticleById(req, res, next);

      expect(res.status.args[0][0]).to
        .equal(503, `Bad status ${res.status.args[0][0]}`);
    });
  });
});
