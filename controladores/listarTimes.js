const knex = require('../src/conexao')

const listarTimes = async (req, res) => {
    const times = await knex('times_serie_a')
    return res.json(times)
}


module.exports = listarTimes