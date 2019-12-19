const knex = require('../db/connection');
exports.fetchUserByUsername = ({username}) => {
  return knex
    .select('username', 'avatar_url', 'name')
    .from('users')
    .where('username', username)
    .then(user => {
      if (user[0]) return user[0]
      else return Promise.reject({status:404, message: "User does not exist"})
    });
};
