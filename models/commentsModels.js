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
      return comments;
    });
};

exports.updateCommentById = ({ comment_id }, { inc_votes }) => {
  return knex
    .from('comments')
    .where('comment_id', comment_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(updatedComment => {
      return updatedComment[0];
    });
};
