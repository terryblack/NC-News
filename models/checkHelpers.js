const knex = require('../db/connection')

exports.checkArticleExists = article_id => {
  return knex
    .from('articles')
    .select('articles.*')
    .where('article_id', article_id)
    .then(article => {
      if (!article) return Promise.reject({ status: 404, message: 'Article not found' });
    });
};

exports.checkTopicExists = topic => {
  return knex
    .from('topics')
    .select('topics.*')
    .where('slug', topic)
    .then(topic => {
      if (!topic[0]) return Promise.reject({ status: 404, message: 'Topic not found' });
      return topic
    });
};

exports.checkAuthorExists = author => {
  return knex
    .from('users')
    .select('users.*')
    .where('username', author)
    .then(author => {
      if (!author[0]) return Promise.reject({ status: 404, message: 'Author not found' });
      return author
    });
};
