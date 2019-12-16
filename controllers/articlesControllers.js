const { fetchArticleById, updateArticleById } = require('../models/articlesModels');

exports.getArticlesById = (req, res, next) => {
  fetchArticleById(req.params.article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  console.log(req.body.inc_votes, '<--- body in controller');
  // console.log(req.params.article_id);
  updateArticleById(req.params, req.body.inc_votes)
    .then(updatedArticle => {
      res.status(201).send({ updatedArticle });
    })
    .catch(next);
};
