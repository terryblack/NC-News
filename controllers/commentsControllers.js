const { addNewComment, fetchArticleComments } = require('../models/commentsModels');

exports.postNewComment = (req, res, next) => {
  addNewComment(req.params, req.body)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  fetchArticleComments(req.params).then(comments => {
    res.status(200).send({ comments });
  });
};
