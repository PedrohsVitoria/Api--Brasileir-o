const express = require('express')
const listarTimes = require('../controladores/listarTimes')
const filtrarTimes = require('../controladores/filtrarTimesPorEstado')
const cadastrarUsuario = require('../UsuariosPermitidos/cadastrarUsuario')
const login = require('../UsuariosPermitidos/login')
const verificarLogin = require('../intermediarios/autenticaçãoToken')
const editarUsuario = require('../UsuariosPermitidos/editarUsuario')
const deletarUsuario = require('../UsuariosPermitidos/deletarUsuario')

const rotas = express()

rotas.get('/times', listarTimes)
rotas.post('/filtro', filtrarTimes)

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.use(verificarLogin)

rotas.put('/usuario', editarUsuario)
rotas.delete('/usuario/:id', deletarUsuario)



module.exports = rotas