exports.up = function(knex) {
  return knex.schema.createTable('task', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('content').notNullable();
    //table.timestamp('created_at').defaultTo(knex.fn.now())
    //table.timestamp('updated_at').defaultTo(knex.fn.now())
    // return knex.insert({id: 1, name: 'Test'}, 'id')
    // .into('task')

   })
 };

// })
// knex('task')
//   .insert({title: 'title',content: 'content'})

//   knex
//   .select()
//   .from('task') 

exports.down = function(knex) {
  return knex.schema.dropTable('task');

};
