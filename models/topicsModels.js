const knex = require('../db/connection');

exports.fetchAllTopics = () => {
  return knex('topics')
    .select('slug', 'description')
    .then(topics => {
      return topics;
    });
};
