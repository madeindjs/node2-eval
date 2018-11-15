const express = require('express')
const app = express()

// Set directory public as static
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Log server is up and ready
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
