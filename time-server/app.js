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

  // Get time
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  // In case of number between 1-9, add 0
  if (hours < 10)
    hours = "0" + hours
  if (minutes < 10)
    minutes = "0" + minutes
  if (seconds < 10)
    seconds = "0" + seconds

  // Set string with time
  let data = hours + ":" + minutes + ":" + seconds

  // Switch json / simple string
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