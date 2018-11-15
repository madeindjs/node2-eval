const express = require('express')
const app = express()
const port = 3000

const jsonMiddleware = express.json()
app.use(jsonMiddleware)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Return hours minutes and seconds
app.get('/', function(req, res) {
  let date = new Date()
  let hours = date.getHours()
  if (hours < 10)
    hours = "0" + hours
  let minutes = date.getMinutes()
  if (minutes < 10)
    minutes = "0" + minutes
  let seconds = date.getSeconds()
  if (seconds < 10)
    seconds = "0" + seconds
  let data = hours + ":" + minutes + ":" + seconds

  if (req.accepts('json')) {
    data = [{
        hours: hours
      },
      {
        minutes: minutes
      },
      {
        seconds: seconds
      },
    ]
    res
      .header({
        'Content-Type': 'application/json',
      })
      .json(data)
  } else {
    res.send(`<p style="color:blue">${data}</p>`)
  }

})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})