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
      return article[0];
    });
};
