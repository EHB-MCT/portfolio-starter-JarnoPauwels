/**
 * @param {import('knex')} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username').notNullable();
    table.string('password').notNullable();
    // Add other user fields as needed
  })
  .createTable('uploads', function (table) {
    table.increments('id').primary();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('filename').notNullable();
    // Add other upload fields as needed
  });
};

/**
 * @param {import('knex')} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('uploads').dropTableIfExists('users');
};
