
exports.up = function(knex) {
  return knex.schema.createTable('task', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('content').notNullable();
    //table.timestamp('created_at').defaultTo(knex.fn.now())
    //table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('task');
};
