var bodyParser = require('body-parser'),
    http = require('http'),
    express = require('express'),
    Storage = require('./storage')

var PORT = 8080,
    app = express(),
    Server = http.createServer(app),
    Router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use(express.static('public'))

var bienes = []

Router.get('/storage', function(req, res){

  Storage.getData()
       .then(function(data){
         bienes = data;
         //console.log(bienes[0]);
         res.json(bienes);
       }).catch(function(error){
         res.sendStatus(500).json(error)
       })

})

app.use('/', Router)

//module.exports = Router;

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
