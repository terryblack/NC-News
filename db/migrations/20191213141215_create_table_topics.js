
exports.up = function(knex) {
    return knex.schema.createTable('topics', topicsTable => {
        topicsTable.string('slug').primary().unique();
        topicsTable.string('description');
    })
  
};

exports.down = function(knex) {
    // console.log('dropping topics')
    return knex.schema.dropTable('topics')
  
};
