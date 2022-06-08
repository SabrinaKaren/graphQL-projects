const jwt = require('jwt-simple');
const { perfis: obterPerfis } = require('../Type/Usuario.js');

module.exports = {
    async getUsuarioLogado(usuario) {
        const usuarioPerfis = await obterPerfis(usuario);
        const agora = Math.floor(Date.now() / 1000);

        const usuarioInfo = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            perfis: usuarioPerfis.map(perfil => perfil.nome),
            iat: agora,
            exp: agora + (3 * 24 * 60 * 60)
        };

        const authSecret = process.env.APP_AUTH_SECRET;

        return {
            ...usuarioInfo,
            token: jwt.encode(usuarioInfo, authSecret)
        };
    }
};