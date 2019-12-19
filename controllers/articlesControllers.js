const { fetchArticleById, updateArticleById, fetchArticles } = require('../models/articlesModels');
const {checkArticleExists, checkTopicExists, checkAuthorExists} = require('../models/checkHelpers')

exports.getArticlesById = (req, res, next) => {
  Promise.all([fetchArticleById(req.params), checkArticleExists(req.params)])
    .then(resolvedPromises => {
      const article = resolvedPromises[0]
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  updateArticleById(req.params, req.body)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const promiseArray = [fetchArticles(req.query)]
  if(req.query.topic) promiseArray.push(checkTopicExists(req.query))
  if(req.query.author) promiseArray.push(checkAuthorExists(req.query))
  Promise.all(promiseArray)
    .then(resolvedPromises => {
      const articles = resolvedPromises[0]
      res.status(200).send({ articles })
    })
    .catch(next);
};
