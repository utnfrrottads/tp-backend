const express = require('express');
const articleRouter = express.Router();

const article = require('../controllers/articles.controller');
const articleValidator = require('../validators/article.validator');

articleRouter.post('/Get', article.getArticles);
articleRouter.get('/:id', article.getArticle);
articleRouter.post('/', articleValidator.validateArticleCreate, article.createArticle);
articleRouter.put('/:id', articleValidator.validateArticleUpdate, article.editArticle);
articleRouter.delete('/:id', article.deleteArticle);

module.exports = articleRouter;