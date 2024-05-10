const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '2927',
        database: 'brasileirao',
    },
});

module.exports = knex