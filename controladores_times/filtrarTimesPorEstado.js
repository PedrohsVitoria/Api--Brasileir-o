const knex = require('../src/conexao')

const filtrarTimes = async (req, res) => {
    const { estado } = req.body

    const estadoUpperCase = estado.toUpperCase()
    if (estadoUpperCase.length != 2) {
        return res.status(400).json({ Mensagem: 'Informe a sigla do estado com dois dígitos.' })
    }

    try {

        const rows = await knex('times_serie_a')
            .select('time');

        const resultadosFiltrados = rows.reduce((timesEncontrados, row) => {

            const ultimasDuasLetras = row.time.slice(-2)
            if (ultimasDuasLetras === estadoUpperCase) {
                timesEncontrados.push(row.time)

            }
            return timesEncontrados
        }, [])

        if (resultadosFiltrados.length < 1) {
            return res.status(400).json({ Mensagem: 'Esse estado não possui representantes na serie A.' })
        }
        return res.status(200).json({ Mensagem: `Times estado ${estadoUpperCase} que participam do campeonato: ${resultadosFiltrados} ` })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }

}
module.exports = filtrarTimes