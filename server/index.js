const express = require('express');
const app = express();
const port = process.env.PORT || 3002
const db = require('../database')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('hello vorld')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})