import reAssign from '../../utils/reAssign';
import Category from '../../models/categoryModel';

function categoriesCategoryidController(Article) {
  // it's used as middleware to get category, in category router
  async function findCategoryByName(req, res, next) {
    const query = { 'category.name': req.params.categoryName };

    try {
      const categories = await Article.distinct('category', query);

      if (categories && categories.length) {
        [req.category] = categories;
        return next();
      }

      return res.sendStatus(404);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  function get(req, res) {
    const { category } = req;

    const description = encodeURIComponent(category.description);
    category.links = {
      searchByPartialDescription: `http://${req.headers.host}/api/categories/?description=${description}`,
    };

    res.json(category);
  }

  async function put(req, res) {
    const { category } = req;
    const { name } = category;
    reAssign(category, req.body, Category.schema);

    try {
      await Article.updateMany(
        { 'category.name': name },
        { $set: { category } },
      );

      return res.json(category);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function patch(req, res) {
    const { category } = req;
    const { name } = category;

    if (req.body._id) { // eslint-disable-line no-underscore-dangle
      delete req.body._id; // eslint-disable-line no-underscore-dangle
    }
    Object.assign(category, req.body);

    try {
      await Article.updateMany(
        { 'category.name': name },
        { $set: { category } },
      );
      return res.json(category);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function remove(req, res) {
    const { category: { name } } = req;

    try {
      await Article.updateMany(
        { 'category.name': name },
        { $unset: { category: '' } },
      );
      return res.sendStatus(204);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return { // there is no post because category creation is in article controller
    findCategoryByName,
    get,
    put,
    patch,
    remove,
  };
}

module.exports = categoriesCategoryidController;
