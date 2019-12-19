const knex = require('../db/connection');

exports.addNewComment = ({ article_id }, comment) => {
  const newComment = {
    author: comment.username,
    article_id: article_id,
    body: comment.body
  };

  return knex
    .insert(newComment)
    .into('comments')
    .returning('*')
    .then(comment => {
      return comment[0];
    });
};

exports.fetchArticleComments = ({ article_id }, { sort_by = 'created_at', order = 'desc' }) => {
  return knex
    .from('comments')
    .select('*')
    .where('article_id', article_id)
    .orderBy(sort_by, order)
    .then(comments => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, message: 'Article not found' });
      } else return comments;
    });
};

exports.updateCommentById = ({ comment_id }, { inc_votes = 0 }) => {
  return knex
    .from('comments')
    .where('comment_id', comment_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(comment => (comment.length === 0 ? Promise.reject({ status: 404, message: 'Comment not found' }) : comment[0]));
};

exports.removeCommentById = ({ comment_id }) => {
  return knex
    .from('comments')
    .where('comment_id', comment_id)
    .delete()
    .then(deletedCount => {
      if (deletedCount === 0)
        return Promise.reject({
          status: 404,
          message: 'Comment does not exist'
        });
      else return deletedCount;
    });
};
