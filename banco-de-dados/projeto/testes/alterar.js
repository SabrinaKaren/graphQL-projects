const db = require('../config/db.js');

const novoUsuario = {
    nome: 'Pedro',
    email: 'pedro@email.com',
    senha: '12345678'
};

async function exercicio() {

    // count
    const { count } = await db('usuarios').count('* as count').first();
    
    // inserir (se a tabela estiver vazia)
    if (count === 0) {
        await db('usuarios').insert(novoUsuario);
    }

    // consultar
    let { id } = await db('usuarios')
        .select('id')
        .limit(1)
        .first();
    
    // alterar
    await db('usuarios')
        .where({ id: id })
        .update({
            nome: 'Pedro Up',
            email: 'pedro-up@email.com'
        });

    return await db('usuarios').where({ id });

}

/* chamando a função async criada */
/* exercicio()
    .then(res => console.log(res))
    .finally(() => db.destroy()); */