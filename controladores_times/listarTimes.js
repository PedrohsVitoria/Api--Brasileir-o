const knex = require('../src/conexao')

const listarTimes = async (req, res) => {
    try {
        const times = await knex('times_serie_a')
        return res.status(202).json(times)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }

}


module.exports = listarTimes