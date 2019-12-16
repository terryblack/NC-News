const knex = require('../db/connection');
exports.fetchUserByUsername = (username) => {
    return knex
    .select('username', "avatar_url", "name")
    .from('users')
    .where('username', username)
    .then(user => {
        return user;
    })
}