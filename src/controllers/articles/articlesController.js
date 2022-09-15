import { promises as fsp } from 'fs';

function articlesController(Article) {
  async function get(req, res) {
    const query = {};
    let slicePrices = 1;

    if (req.query.code) { // text search (text index must be defined)
      query.code = req.query.code;
    }
    if (req.query.description) {
      query.$text = { $search: req.query.description };
    }
    if (req.query.prices) {
      slicePrices = req.query.prices; // define how many prices it get (price history)
    }
    if (req.query.category) {
      query['category.name'] = req.query.category;
    }

    try {
      const articles = await Article.find(query).slice('prices', slicePrices);

      const returnArticles = articles.map((article) => {
        const newArticle = article.toJSON();
        const description = encodeURIComponent(newArticle.description);

        newArticle.links = {};
        newArticle.links.self = `http://${req.headers.host}/api/articles/${article._id}`; // eslint-disable-line no-underscore-dangle
        newArticle.links.findByPartialDescription = `http://${req.headers.host}/api/articles/?description=${description}`;

        return newArticle;
      });

      return res.json(returnArticles);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  async function post(req, res) {
    const { body } = req;
    if (!body.prices) {
      body.prices = [];
    }
    if (body.price) {
      body.prices.unshift(body.price);
      delete body.price; // if exists, fails virtual property defined in schema
    }

    const article = new Article(body);

    if (!article.prices[0]) {
      res.status(400);
      return res.send('Price is required');
    }

    if (!article.prices[0].sinceDate) {
      article.prices[0].sinceDate = new Date();
    }

    if (!article.code) {
      res.status(400);
      return res.send('Code is required');
    }

    if (body.image) {
      const encodedImage = body.image.replace(/^data:image\/.*;base64,/, '');
      const buff = Buffer.from(encodedImage, 'base64');
      await fsp.writeFile(process.env.FRONTEND_PATH + article.urlImage, buff);
    }

    try {
      const art = await article.save();
      res.status(201);
      return res.json(art);
    } catch (err) {
      res.status(503);
      return res.send(err);
    }
  }

  return { get, post };
}

module.exports = articlesController;
