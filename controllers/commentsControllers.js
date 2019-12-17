const { addNewComment, fetchArticleComments, updateCommentById } = require('../models/commentsModels');

exports.postNewComment = (req, res, next) => {
  addNewComment(req.params, req.body)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  fetchArticleComments(req.params, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  console.log(req.body);
  updateCommentById(req.params, req.body)
    .then(updatedComment => {
      res.status(200).send({ updatedComment });
    })
    .catch(next);
};
