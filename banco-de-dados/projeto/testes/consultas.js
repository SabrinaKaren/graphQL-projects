const db = require('../config/db.js');

/* db('perfis')
    .then(res => res.map(p => p.nome))
    .then(nomes => console.log(nomes))
    .finally(() => db.destroy()); */

/* db('perfis').select('nome', 'id')
    .then(res => console.log(res))
    .finally(() => db.destroy()); */

/* db.select('id', 'nome')
    .from('perfis')
    .limit(2)
    .offset(2)
    .then(res => console.log(res))
    .finally(() => db.destroy()); */

/* db('perfis')
    // .where({ id: 2 })
    // .where('id', '=', 2)
    // .where('nome', 'like', '%n%')
    // .whereNot({ id: 2 })
    .whereIn('id', [1, 2, 3])
    // .first()
    .then(res => console.log(res))
    .finally(() => db.destroy()); */