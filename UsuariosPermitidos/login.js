const knex = require('../src/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios_permitidos')
            .select('*')
            .where('email', email)
            .first()

        if (!usuario) {
            return res.status(400).json({
                mensagem: "Email ou senha inválido!"
            })
        }

        const { senha: senhaUsuario, ...usuarioSemSenha } = usuario

        const senhaValida = await bcrypt.compare(senha, senhaUsuario)

        if (!senhaValida) {
            return res.status(400).json({
                mensagem: "Email ou senha inválido!"
            })
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
            expiresIn: '8h',
        })

        return res.status(200).json({ usuario: usuarioSemSenha, token })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ erro: "Erro interno do servidor" });
    }

}


module.exports = login