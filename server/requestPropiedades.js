var express = require('express')
var path = require('path')
var Router = express.Router()

var viewsPath = path.join(__dirname, '../') + 'public/'

Router.get('/index', function(req, res) {
  res.sendFile(viewsPath + 'index.html')
})

Router.all('*', function(req, res) {
  res.send('No se encontro el recurso solicitado')
  res.end()
})

module.exports = Router
