const knex = require('../src/conexao')
const bcrypt = require('bcrypt')


const editarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    try {

        const emailExistente = await knex('usuarios_permitidos')
            .where('email', email)
            .andWhere('id', '<>', req.usuario.id)
            .first()

        if (emailExistente) {
            return res.status(400).json({ erro: "E-mail já cadastrado" })
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioEditado = await knex('usuarios_permitidos')
            .where('id', req.usuario.id)
            .update({
                nome,
                email,
                senha: senhaCriptografada
            })

        if (!usuarioEditado) {
            return res.status(400).json('Usuário não foi atualizado')
        }

        return res.status(200).json("Usuário atualizado com sucesso.")
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = editarUsuario