import express from 'express';
import categoriesController from '../controllers/categories/categoriesController';
import categoriesCategoryidController from '../controllers/categories/categoriesCategoryidController';

function routes(Article) {
  const categoryRouter = express.Router();
  const controller = categoriesController(Article);

  categoryRouter.route('/')
    .get(controller.get);

  const controllerId = categoriesCategoryidController(Article);

  categoryRouter.use('/:categoryName', (req, res, next) => {
    controllerId.findCategoryByName(req, res, next);
  });

  categoryRouter.route('/:categoryName')
    .get(controllerId.get)
    .put(controllerId.put)
    .patch(controllerId.patch)
    .delete(controllerId.remove);

  return categoryRouter;
}

module.exports = routes;
