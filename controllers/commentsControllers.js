const {
  addNewComment,
  fetchArticleComments,
  updateCommentById,
  removeCommentById
} = require("../models/commentsModels");

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
  updateCommentById(req.params, req.body)
    .then(updatedComment => {
      res.status(200).send({ updatedComment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  removeCommentById(req.params)
    .then(() => res.sendStatus(204))
    .catch(next);
};
