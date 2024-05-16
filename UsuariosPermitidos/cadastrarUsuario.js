const knex = require('../src/conexao')
const bcrypt = require('bcrypt')


const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const emailExiste = await knex('usuarios_permitidos')
            .where('email', email)
            .first()


        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const cadastrarUsuario = {
            nome,
            email,
            senha: senhaCriptografada
        }
        const query = await knex('usuarios_permitidos')
            .insert(cadastrarUsuario)


        const usuarioCadastrado = {
            nome: cadastrarUsuario.nome,
            email: cadastrarUsuario.email
        }

        return res.status(201).json(usuarioCadastrado)


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

module.exports = cadastrarUsuario