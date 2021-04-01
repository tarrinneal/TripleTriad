const mongoose = require('mongoose');
mongoose.connect(process.env.DBTOKEN);

const UsersSchema = mongoose.Schema({
  user: String,
  password: String,
  gamesPlayed: Number,
  wins: Number,
  cards: [Map]
})

const CardSchema = mongoose.Schema({
  id: Number,
  quantity: Number
})

let Users = mongoose.model('Users', UsersSchema);
let Card = mongoose.model('Card', CardSchema);

const login = (user) => {
  return Users.findOne({
    user: user
  })
}

const signup = (user, password) => {
  let newUser = {
    user: user,
    password: password,
    gamesPlayed: 0,
    wins: 0,
    cards: [
      {
        id: 1,
        quantity: 1
      },
      {
        id: 2,
        quantity: 1
      },
      {
        id: 3,
        quantity: 1
      },
      {
        id: 4,
        quantity: 1
      },
      {
        id: 5,
        quantity: 1
      }
    ]
  }

  return Users.create(newUser)
}


module.exports = {
  login,
  signup
}

// let test = {
//   user: 'Bargle',
//   password: 'Bargle',
//   gamesPlayed: 0,
//   wins: 0,
//   cards: [
//     {
//       id: 1,
//       quantity: 1
//     },
//     {
//       id: 2,
//       quantity: 1
//     },
//     {
//       id: 3,
//       quantity: 1
//     },
//     {
//       id: 4,
//       quantity: 1
//     },
//     {
//       id: 5,
//       quantity: 1
//     },
//     {
//       id: 100,
//       quantity: 1
//     },
//     {
//       id: 110,
//       quantity: 1
//     }
//   ]
// }

// Users.create(test)