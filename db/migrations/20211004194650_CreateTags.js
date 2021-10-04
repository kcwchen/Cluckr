exports.up = function (knex) {
  return knex.schema.createTable('tags', (table) => {
    table.string('tag').primary();
    table.integer('counter');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tags');
};
