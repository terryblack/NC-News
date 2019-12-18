const knex = require('../db/connection');
exports.fetchArticleById = article_id => {
  return knex
    .select('articles.author', 'title', 'articles.article_id', 'articles.body', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .join('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .count({ comment_count: 'comments.article_id' })
    .where('articles.article_id', '=', article_id)
    .then(article => {
      if (article[0]) return article[0];
      else return Promise.reject({ status: 404, message: 'Article not found' });
    });
};

exports.updateArticleById = ({ article_id }, inc_votes = 0) => {
  return knex
    .from('articles')
    .where('article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(updatedArticle => {
      if (updatedArticle[0]) return updatedArticle[0];
      else return Promise.reject({ status: 404, message: 'Article not found' });
    });
};

exports.fetchArticles = ({ sort_by = 'created_at', order = 'desc', author, topic }) => {
  return knex
    .from('articles')
    .select('articles.*')
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where('articles.author', author);
      if (topic) query.where('articles.topic', topic);
    })
    .then(articles => {
      return articles;
    });
};
