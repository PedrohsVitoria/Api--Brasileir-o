const express = require('express')
const listarTimes = require('../controladores/listarTimes')

const rotas = express()

rotas.get('/times', listarTimes)

module.exports = rotas