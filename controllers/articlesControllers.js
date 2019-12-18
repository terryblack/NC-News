const { fetchArticleById, updateArticleById, fetchArticles } = require('../models/articlesModels');

exports.getArticlesById = (req, res, next) => {
  fetchArticleById(req.params.article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  updateArticleById(req.params, req.body.inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
