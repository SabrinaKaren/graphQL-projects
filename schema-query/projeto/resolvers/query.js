const { usuarios, perfis } = require('../data/db.js');

module.exports = {

    ola() {
        return 'Hello world!';
    },

    horaAtual() {
        return new Date();
    },

    usuarioLogado() {
        return {
            id: 1,
            nome: 'Ana da Web',
            email: 'anadaweb@email.com',
            idade: 23,
            salario_real: 1234.56,
            vip: true
        }
    },

    produtoEmDestaque() {
        return {
            nome: 'Caderno Tilibra',
            preco: 20,
            desconto: 0.1
        }
    },

    numerosMegaSena() {
        const crescente = (a, b) => a - b;
        return Array(6).fill(0)
            .map(() => parseInt(Math.random() * 60) + 1)
            .sort(crescente);
    },

    usuarios() {
        return usuarios;
    },

    usuario(_, args) {
        const matches = usuarios.filter(usuario => usuario.id === args.id);
        return matches ? matches[0] : null;
    },

    perfis() {
        return perfis;
    },

    perfil(_, { id }) {
        const matches = perfis.filter(perfil => perfil.id === id);
        return matches ? matches[0] : null;
    }

};