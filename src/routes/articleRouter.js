import express from 'express';
import articleController from '../controllers/articles/articlesController';
import articleIdController from '../controllers/articles/articlesArticleidController';

function routes(Article) {
  const articleRouter = express.Router();
  const controller = articleController(Article);

  articleRouter.route('/articles')
    .post(controller.post)
    .get(controller.get);

  const controllerId = articleIdController(Article);

  articleRouter.use('/articles/:articleId', (req, res, next) => { // middleware that interrupts request
    controllerId.findArticleById(req, res, next);
  });

  articleRouter.route('/articles/:articleId')
    .get(controllerId.get)
    .put(controllerId.put)
    .patch(controllerId.patch)
    .delete(controllerId.remove);

  return articleRouter;
}

module.exports = routes;
