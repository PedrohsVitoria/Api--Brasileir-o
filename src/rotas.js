const express = require('express')
const listarTimes = require('../controladores_times/listarTimes')
const filtrarTimes = require('../controladores_times/filtrarTimesPorEstado')
const cadastrarUsuario = require('../UsuariosPermitidos/cadastrarUsuario')
const login = require('../UsuariosPermitidos/login')
const verificarLogin = require('../intermediarios/autenticaçãoToken')
const editarUsuario = require('../UsuariosPermitidos/editarUsuario')
const deletarUsuario = require('../UsuariosPermitidos/deletarUsuario')
const adicionarJogo = require('../controladores_tabela/adicionarJogo')
const listarTabela = require('../controladores_tabela/tabelasDeJogos')
const validarRequisicao = require('../intermediarios/validarRequisicao')
const { schemaCadastroUsuario } = require('../validacoes/validacaoCadastrarUsuario')
const { schemaLoginUsuario } = require('../validacoes/validacaoLoginUsuario')
const { schemaEditarUsuario } = require('../validacoes/validacaoEditarUsuario')


const rotas = express()

rotas.get('/times', listarTimes)
rotas.post('/filtro', filtrarTimes)

rotas.post('/usuario', validarRequisicao(schemaCadastroUsuario), cadastrarUsuario)
rotas.post('/login', validarRequisicao(schemaLoginUsuario), login)

rotas.get('/tabela', listarTabela)

rotas.use(verificarLogin)

rotas.put('/usuario', validarRequisicao(schemaEditarUsuario), editarUsuario)
rotas.delete('/usuario/:id', deletarUsuario)

rotas.post('/jogo', adicionarJogo)




module.exports = rotas