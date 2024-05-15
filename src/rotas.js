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


const rotas = express()

rotas.get('/times', listarTimes)
rotas.post('/filtro', filtrarTimes)

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.get('/tabela', listarTabela)

rotas.use(verificarLogin)

rotas.put('/usuario', editarUsuario)
rotas.delete('/usuario/:id', deletarUsuario)

rotas.post('/jogo', adicionarJogo)




module.exports = rotas