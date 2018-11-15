const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch')
const fs = require('fs-extra')
var bodyParser = require('body-parser')

var logFile = 'log/servers-log.json'
fs.createFile(logFile)


/**
 * A function who return the latest n logs
 * @param  {Integer} the amount of wanted datas      
 * @return {[Array]} the wanted datas
 */
let getLogs = ((count, callback) => {
  fs.readJson(logFile, function(err, datas){
    if (count != undefined) {
      callback(datas.slice(datas.length - count, datas.length))
    }
    callback(datas)
  })
})

/**
 * A function who log the response to a specified file
 * @param  {Error} err      
 * @param  {Array} oldData) The olds logs readed
 * @return {void}
 */
let logDatas = ((data) => {
  fs.readJson(logFile, function(err, oldData) {
    oldData.push(data)
    fs.outputJsonSync(logFile, oldData)
  })
})

/**
 * A promise to an api endpoint to get the actual time-server
 * @param  {Promise} (resolve, reject)
 * @return {Promise}             
 */
let getTime = new Promise((resolve, reject) => {
  fetch('http://time-server:3000')
    .then(res => resolve(res.text()))
    .catch(err => reject(err))
})

/**
 * A promise to an api endpoint to get the actual secret password
 * @param  {Promise} (resolve, reject)
 * @return {Promise}             
 */
let getSecret = new Promise((resolve, reject) => {
  fetch('http://secret-server:3000/secret')
    .then(res => resolve(res.text()))
    .catch(err => reject(err))
})

/**
 * Function wrapped in a setInterval function to trigger the api
 * every 5 seconds, get back the datas and wrap it to
 * the right format
 * @param  {setInterval}    
 * @param  {Promise.all()}    
 * @return {void}
 */
setInterval(() =>  {
  Promise.all([getTime, getSecret])
    .then(response => {
      return { time: response[0], secret: response[1]}
    })
    .catch((error) => {
      console.error(error)
    })
    .then((data) => {
      logDatas(data)
    })
}, 5000)



app.get('/logs/:count', function(req, res) {
  getLogs(req.params.count, ((logs) => {
    res.json(logs)
  }))
})



app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})
