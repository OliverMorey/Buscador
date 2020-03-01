var fs = require('fs'),
path = require('path'),
promise = require('promise')

module.exports = {

      // saveData: function(dataType, newData, data){
      //   var dataPath = dataType == 'users' ? __dirname + path.join('/data/users.json'):
      //           __dirname + path.join('/data/messages.json')
      //   data.current.push(newData)
      //   return new promise(function (resolver, reject){
      //     fs.writeFile(dataPath, JSON.stringify(data), function(err){
      //       if(err) reject(err)
      //       resolve('OK')
      //     })
      //   })
      // },
  getData: function(){
    var dataPath = path.join(__dirname, '..', '/public/data.json')
    return new promise(function (resolve, reject){
      fs.readFile(dataPath, 'utf8', function (err, readData){
        if(err) reject(err)
        //if(err) console.log(err)
        resolve(JSON.parse(readData))
      })
    })
  }

}
