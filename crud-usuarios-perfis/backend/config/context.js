const jwt = require('jwt-simple');

module.exports = async ({ req }) => {

    // simulando usuário logado
    // await require('./simularLogin.js')(req);

    const auth = req.headers.authorization;
    const token = auth && auth.substring(7);

    let usuario = null;
    let admin = false;

    if (token) {
        try {
            let conteudoToken = jwt.decode(token, process.env.APP_AUTH_SECRET);
            if (new Date(conteudoToken.exp * 1000) > new Date()) {
                usuario = conteudoToken;
            }
        } catch (error) {
            // token inválido
        }
    }

    if (usuario && usuario.perfis) {
        admin = usuario.perfis.includes('admin');
    }

    const error = new Error('Acesso negado!');

    return {
        usuario,
        admin,
        validarUsuario() {
            if (!usuario) throw error;
        },
        validarAdmin() {
            if (!admin) throw error;
        },
        validarUsuarioFiltro(filtro) {
            if (admin) return;
            if (!usuario) throw error;
            if (!filtro) throw error;

            const { id, email } = filtro;
            if (!id && !email) throw error;
            if (id && id !== usuario.id) throw error;
            if (email && email !== usuario.email) throw error;
        }
    };

};