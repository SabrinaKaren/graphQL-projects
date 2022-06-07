/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usuarios_perfis', table => {
      table.integer('usuario_id').unsigned()
      table.integer('perfil_id').unsigned()
      table.foreign('usuario_id').references('usuarios.id')
      table.foreign('perfil_id').references('perfis.id')
      table.primary(['usuario_id', 'perfil_id'])
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usuarios_perfis');
};