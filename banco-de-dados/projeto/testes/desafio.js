const db = require('../config/db.js');

async function salvarUsuario(nome, email, senha) {

    let usuario = await db('usuarios')
        .where({ email: email })
        .first();
    
    // se algum registro for encontrado, atualiza-lo;
    // caso não for encontrado, cria-lo
    if (usuario) {
        await db('usuarios')
            .where({ id: usuario.id })
            .update({ nome, email, senha });
        usuario = { ...usuario, nome, email, senha };
    } else {
        let [ id ] = await db('usuarios').insert({ nome, email, senha});
        usuario = await db('usuarios').where({ id }).first();
    }

    return usuario;
    
}

async function salvarPerfil(nome, rotulo) {

    let perfil = await db('perfis')
        .where({ nome })
        .first();
    
    // se algum registro for encontrado, atualiza-lo;
    // caso não for encontrado, cria-lo
    if (perfil) {
        await db('perfis')
            .where({ id: perfil.id })
            .update(perfil);
        perfil = { ...perfil, nome, rotulo };
    } else {
        let [ id ] = await db('perfis').insert({ nome, rotulo });
        perfil = await db('perfis').where({ id }).first();
    }

    return perfil;

}

async function adicionarPerfis(usuario, ...perfis) {

    const usuario_id = usuario.id;
    
    await db('usuarios_perfis')
        .where({ usuario_id })
        .delete();
    
    for (perfil of perfis) {
        const perfil_id = perfil.id;
        await db('usuarios_perfis')
            .insert({ usuario_id, perfil_id });
    }

}

async function executar() {
    const usuario = await salvarUsuario('Sabrina', 'sabrina@email.com', '12345678');
    const perfilA = await salvarPerfil('rh', 'Pessoal');
    const perfilB = await salvarPerfil('fin', 'Financeiro');

    console.log(usuario);
    console.log(perfilA);
    console.log(perfilB);

    await adicionarPerfis(usuario, perfilA, perfilB);
}

/* chamando a função async criada */
executar()
    .catch(err => console.error(err))
    .finally(() => db.destroy());