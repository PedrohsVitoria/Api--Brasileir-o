const knex = require('../src/conexao')

const listarTabela = async (req, res) => {
    const { rodada } = req.body
    if (rodada > 38) {
        return res.status(400).json({ erro: "O campeonato só possui 38 rodadas. " })
    }
    try {

        const rodadaExistente = await knex('tabela_de_jogos')
            .where('rodada', rodada)
            .first()

        if (!rodadaExistente) {
            return res.status(400).json({ erro: "Ainda não aconteceu a rodada. " })
        }

        const rodadaJogada = await knex('tabela_de_jogos')
            .select('*')
            .where('rodada', rodada)

        return res.status(200).json(rodadaJogada)

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}


module.exports = listarTabela