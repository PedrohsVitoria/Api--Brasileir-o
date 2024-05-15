const knex = require('../src/conexao')

const deletarUsuario = async (req, res) => {
    const { id } = req.params

    try {
        const usuarioAtivo = await knex('usuarios_permitidos')
            .where('id', id)
            .first()

        if (!usuarioAtivo) {
            return res.status(404).json({ mensagem: 'Usuário informado não existe.' })
        }
        await knex('usuarios_permitidos')
            .where('id', id)
            .delete()

        return res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro no servidor.' });

    }
}

module.exports = deletarUsuario