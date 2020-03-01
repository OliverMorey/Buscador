var http = require('http');
var fs = require('fs');
var path = require('path');
var promise = require('promise');


var bienes = [];
var stringify = [];

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

function removeByteOrderMark(str){
    return str.replace(/^\ufeff/g,"")
}

http.createServer(function (req, res) {
  //var dataPath = process.cwd() + path.join('/public/data.json')
  var dataPath = path.join(__dirname, '..', '/public/data.json');

  //return new promise(function (resolve, reject){
    fs.readFile(dataPath, 'utf8', function (err, data){
      if(err) console.log(err)
      else {
        //data = removeByteOrderMark(data);
        bienes = JSON.parse(data);
        //res.write(JSON.parse(data));
        console.log(bienes[99].Direccion);
      }
    })
  //})
//  fs.readFile(dataPath, 'utf8', function(err, data) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write(data);
//    stringify = JSON.stringify(data);
//    bienes = JSON.parse(stringify);
//    console.log(bienes.Id);
  res.end();
}).listen(8080);
