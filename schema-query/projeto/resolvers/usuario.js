const { perfis } = require('../data/db.js');

module.exports = {

    /* O primeiro parâmetro que todo resolver recebe é o parent (o pai).
    Já resolver dentro de 'Query', o primeiro parâmetro é undefined,
    pois como é ponto de entrada, o objeto está nulo/undefined. */

    salario(usuario) {
        return usuario.salario_real
    },

    perfil(parent) {
        const matches = perfis.filter(perfil => perfil.id === parent.perfil_id);
        return matches ? matches[0] : null;
    }

};