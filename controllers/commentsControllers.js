const { addNewComment } = require('../models/commentsModels');

exports.postNewComment = (req, res, next) => {
  addNewComment(req.params, req.body)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};
