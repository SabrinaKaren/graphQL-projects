/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('perfis', table => {
      table.increments('id').primary()
      table.string('nome').notNullable().unique()
      table.string('rotulo').notNullable()
  }).then(function() {
      return knex('perfis').insert([
         { nome: 'comum', rotulo: 'Comum' } ,
         { nome: 'admin', rotulo: 'Administrador' } ,
         { nome: 'master', rotulo: 'Master' } 
      ]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('perfis');
};