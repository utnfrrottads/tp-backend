const express = require('express');
const articleRouter = express.Router();
const article = require('../controllers/articles.controller');

articleRouter.get('/', article.getArticles);
articleRouter.get('/:id', article.getArticle);
articleRouter.post('/', article.createArticle);
articleRouter.put('/:id', article.editArticle);
articleRouter.delete('/:id', article.deleteArticle);

module.exports = articleRouter;