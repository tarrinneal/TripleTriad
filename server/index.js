const express = require('express');
// const io = require('socket.io')
// const UUID = require('node-uuid')
const app = express();
// const http = require('http')
// const server = http.createServer(app)
// const server = require('http').createServer(app)
require('dotenv').config();
// const io = require('socket.io')(server)
const port = process.env.PORT || 3002
const db = require('../database')
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  // res.sendFile(__dirname.substr(__dirname.length - 7) + '/public/index.html')
  res.send('hi')
})

// app.get('/socket.io/*', (req, res) => {
//   // res.sendFile(__dirname.substr(0, __dirname.length - 7) + '/node_modules/socket.io/client-dist/socket.io.js')
//   console.log('hi')
//   res.send('hi')
// })

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

// server.listen(+port + 1, () => {
//   console.log('this is up now at ' + (+port + 1))
// })

// debugger;
// const sio = io()
// sio.listen(server)

// sio.sockets.on('connection', () => {
//   console.log('finally')
// })

// sio.configure(() => {
//   sio.set('log level', 0);

//   sio.set('authorization', (handshakeData, callback) => {
//     callback(null, true);
//   });
// })

// sio.sockets.on('connection', function (client) {

//   //Generate a new UUID, looks something like
//   //5b2ca132-64bd-4513-99da-90e838ca47d1
//   //and store this on their socket/connection
//   client.userid = UUID();

//   //tell the player they connected, giving them their id
//   client.emit('onconnected', { id: client.userid } );

//   //Useful to know when someone connects
//   console.log('\t socket.io:: player ' + client.userid + ' connected');

//   //When this client disconnects
//   client.on('disconnect', function () {

//       //Useful to know when someone disconnects
//     console.log('\t socket.io:: client disconnected ' + client.userid );

//   }); //client.on disconnect

// }); //sio.sockets.on connection