
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.tinyint('isAdmin').notNull();
   })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
