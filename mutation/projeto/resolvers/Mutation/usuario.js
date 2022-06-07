const { usuarios, proximoId } = require('../../data/db.js');

function indiceUsuario(filtro) {
    if (!filtro) return -1;

    const { id, email } = filtro;
    if (id) return usuarios.findIndex(u => u.id === id);
    else if (email) return usuarios.findIndex(u => u.email === email);
    else return -1;    
}

module.exports = {

    novoUsuario(_, { dados }) {
        const emailExistente = usuarios.some(u => u.email === dados.email);
        if (emailExistente) {
            throw new Error('E-mail já cadastrado!');
        }

        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        };

        usuarios.push(novo);
        return novo;
    },

    excluirUsuario(_, { filtro }) {
        const indice = indiceUsuario(filtro);
        if (indice < 0) return null;
        
        const excluidos = usuarios.splice(indice, 1);
        return excluidos ? excluidos[0] : null;
    },

    alterarUsuario(_, { filtro, dados }) {
        const indice = indiceUsuario(filtro);
        if (indice < 0) return null;

        const usuario = {
            ...usuarios[indice],
            ...dados
        };
        usuarios.splice(indice, 1, usuario);
        return usuario;
    }

};