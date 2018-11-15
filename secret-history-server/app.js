const express = require('express')
const app = express()
const port = 4000
const fetch = require('node-fetch');

let getTime = new Promise((resolve, reject) => { 
    fetch('http://localhost:4000/')
      .catch(err => reject(err))
      .then(res => resolve(res))
})

let getSecret = new Promise((resolve, reject) => { 
  fetch('http://localhost:4001/secret')
      .catch(err => reject(err))
      .then(res => resolve(res))
})

setInterval(function(){
  Promise.all([getTime, getSecret])
  .then(values => { 
    console.log(values)
  })
  .catch(error => {
    console.error(error)
  })
}, 5000)



app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
