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

exports.fetchArticleComments = ({ article_id }) => {
  return knex
    .from('comments')
    .select('*')
    .where('article_id', article_id)
    .then(comments => {
      return comments;
    });
};
