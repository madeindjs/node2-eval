const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch');
var fs = require('fs-extra');

var logFile = 'log/servers-log.json'
fs.createFile(logFile, function(err) {
  console.error(err);
})

let getTime = new Promise((resolve, reject) => {
  fetch('http://time-server:3000/')
    .catch(err => reject(err))
    .then(res => resolve(res))
})

let getSecret = new Promise((resolve, reject) => {
  fetch('http://secret-server:3000/secret')
    .catch(err => reject(err))
    .then(res => resolve(res))
})

setInterval(function() {
  Promise.all([getTime, getSecret])
    .then(values => {
      console.log(values)
    })
    .catch(error => {
      console.error(error)
    })
}, 5000)



app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})