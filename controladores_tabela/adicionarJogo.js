const knex = require('../src/conexao');

const adicionarJogo = async (req, res) => {

    const { rodada, time_mandante, time_visitante, gols_mandante, gols_visitante } = req.body
    try {
        const mandante = await knex('times_serie_a')
            .where('time', time_mandante)
            .first();

        if (!mandante) {
            return res.status(400).json({ mensagem: 'Time informado não existe.' })
        }

        const visitante = await knex('times_serie_a')
            .where('time', time_visitante)
            .first();

        if (!visitante) {
            return res.status(400).json({ mensagem: 'Time informado não existe.' })
        }
        const cadastrarJogo = await knex('tabela_de_jogos')
            .insert({
                rodada,
                time_mandante,
                time_visitante,
                gols_mandante,
                gols_visitante

            })
            .returning('*')


        return res.status(201).json({
            mensagem: 'Jogo cadastrado com sucesso.',
            partida: `Placar final ${time_mandante} -> ${gols_mandante} X  ${gols_visitante} - ${time_visitante} `
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

}

module.exports = adicionarJogo