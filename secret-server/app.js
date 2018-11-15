const express = require('express')
const fs = require('fs-extra')
const path = require('path');
const bodyParser = require('body-parser')

const secretPath = path.join(__dirname, 'data', 'secret.txt')

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})


function encrypt(buffer) {
  return Buffer.from(buffer).toString('base64')
}

function decrypt(buffer) {
  return Buffer.from(buffer, 'base64').toString('ascii')
}

app.get('/secret', (req, res) => {
  fs.readFile(secretPath, 'utf8', function(err, data) {
    if (err && err.code == "ENOENT") {
      console.error(err)
      return res.send(
        `Secret is not set. Please set it at PUT <a href="/secret">/secret-update</a>`,
        500
      )
    } else if (err) {
      console.error(err)
      return res.send(err, 500)
    }

    return res.send(decrypt(data))
  })
})

app.put('/secret', (req, res) => {
  let content = req.body.content

  if (!content) {
    return res.send('You must specify content param', 400)
  }


  fs.writeFile(secretPath, encrypt(content), function(err, data) {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }

    return res.sendStatus(200)
  })
})

app.listen(port, () => console.log(`Secret Server is ready`))