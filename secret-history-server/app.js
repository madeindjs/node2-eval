const express = require('express')
const app = express()
const port = 4000
const fetch = require('node-fetch');

let getTime = new Promise((resolve, reject) => { 
    fetch('http://localhost:4000/')
      .then(checkStatus)
      .then(res => resolve(res))
})

let getSecret = new Promise((resolve, reject) => { 
  fetch('http://localhost:4001/secret')
      .then(checkStatus)
      .then(res => resolve(res))
})

Promise.all([getTime, getSecret]).then(values => { 
  console.log(values)
}, reason => {
  console.log(reason)
});

function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        throw MyCustomError(res.statusText);
    }
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
