const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(8080, err => {
  if (err) {
    throw err
  }
  console.log('> Ready on port 8080', path.join(__dirname + '/index.html'))
})
