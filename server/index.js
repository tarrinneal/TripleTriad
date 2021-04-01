const express = require('express');
const app = express();
// const server = require('http').createServer(app).listen(process.env.PORT || 3002);
require('dotenv').config();
// const io = require('socket.io').listen(server)
const port = process.env.PORT || 3002
const db = require('../database')
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello vorld')
})

app.get('/login', (req, res) => {

  db.login(req.headers.user)
    .then(user => {
      if (user.password === req.headers.password) {
        res.send(user)
      } else {
        res.status(501).send('Incorrect Password')
      }
    })
    .catch(err => {
      res.status(501).send('Please Sign Up')
    })
})

app.post('/signup', (req, res) => {

  db.login(req.body.data.user)
    .then((response) => {
      if (response) {
        res.status(501).send('User Already Exists')
      } else {
        db.signup(req.body.data.user, req.body.data.password)
        .then(() => {
          db.login(req.body.data.user)
            .then((response) => {
              res.send(response)
            })
            .catch((err) => {
              res.status(501).send('Please Log In')
            })
        })
      }
    })
    .catch((err) => {
      res.status(501).send('Please Try Again')
    })
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})

// io.listen(server)