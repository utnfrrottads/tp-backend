import reAssign from '../../utils/reAssign';

function articlesArticleidControler(Article) {
  async function findArticleById(req, res, next) {
    try {
      const article = await Article.findById(req.params.articleId).slice('prices', 1);

      if (article) {
        req.article = article;
        return next();
      }

      return res.sendStatus(404);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  function get(req, res) {
    const { article } = req;

    const returnArticle = article.toJSON();
    if (article.category) {
      const category = encodeURIComponent(article.category.name);
      returnArticle.links = {
        filterByThisCategory: `http://${req.headers.host}/api/articles/?category=${category}`,
      };
    }

    res.json(returnArticle);
  }

  async function put(req, res) {
    const { article } = req;
    reAssign(article, req.body, Article.schema);

    try {
      await article.save();
      return res.json(article);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function patch(req, res) {
    const { article } = req;

    if (req.body._id) { // eslint-disable-line no-underscore-dangle
      delete req.body._id; // eslint-disable-line no-underscore-dangle
    }
    Object.assign(article, req.body);

    try {
      await article.save();
      return res.json(article);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function remove(req, res) {
    const { article } = req;

    try {
      await article.remove();
      return res.sendStatus(204);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return {
    findArticleById,
    get,
    put,
    patch,
    remove,
  };
}

module.exports = articlesArticleidControler;
