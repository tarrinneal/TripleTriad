import React from "react";
import axios from "axios";
import anime from "animejs";
import BoardSlot from "./BoardSlot.jsx";
import Hand from "./Hand.jsx";
import Login from "./Login.jsx";
import cards from "../cardStats.js"


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      boardState: {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
        9: undefined,
      },
      placedCards: 0,
      player1: [
        1,
        2,
        3,
        4,
        5
      ],
      player2: [
        10,
        11,
        12,
        13,
        14
      ],
      selectedCard: undefined,
      playerTurn: 1,
      player1Points: 5,
      player2Points: 5,
      loginFailed: false,
      signupFailed: false
    };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.aiMove = this.aiMove.bind(this);
    this.turnChange = this.turnChange.bind(this);
    this.endGame = this.endGame.bind(this);
    this.checkPlacedCard = this.checkPlacedCard.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount () {
    let reroll = () => {
      return Math.floor(Math.random() * 110 + 1)
    }
    this.setState({
      player1: [
        reroll(),
        reroll(),
        reroll(),
        reroll(),
        reroll()
      ],
      player2: [
        reroll(),
        reroll(),
        reroll(),
        reroll(),
        reroll()
      ],
      playerTurn: reroll() > 55 ? 2 : 1
    }, () => {
      this.state.playerTurn === 2 ? this.aiMove() : null
    })
  }

  handleCardClick (e) {
    this.setState({
      selectedCard: +e.target.attributes[2].nodeValue
    })
  }

  handleBoardClick (e) {
    const {selectedCard, boardState, playerTurn, player1, player2, placedCards} = this.state
    if (selectedCard && !boardState[e.target.attributes[0].nodeValue] && !isNaN(+e.target.attributes[0].nodeValue)) {

      let currPlayer = playerTurn === 1 ? player1 : player2;
      let loc = +e.target.attributes[0].nodeValue
      let newBoardState = {
        ...boardState
      }
      boardState[loc] = {
        player: playerTurn,
        id: currPlayer[+selectedCard - 1]
      }
      let newPlayer = currPlayer.slice(0, selectedCard - 1).concat(currPlayer.slice(selectedCard))
      this.setState({
        newBoardState,
        selectedCard: undefined,
        player1: playerTurn === 1 ? newPlayer : player1,
        player2: playerTurn === 2 ? newPlayer : player2,
        placedCards: placedCards + 1
      }, () => {
        this.checkPlacedCard(loc, true)
      })
    }
  }

  turnChange (user) {
    const {placedCards} = this.state;
    if (placedCards >= 9) {
      setTimeout(this.endGame, 150)
    } else {
      user && this.aiMove()
    }
  }

  aiMove () {
    const {boardState, playerTurn, player1, player2, placedCards} = this.state;
    let currPlayer = playerTurn === 1 ? player1 : player2;
    let newBoardState = {
      ...boardState
    }
    let loc = Math.floor(Math.random() * 9 + 1)
    while (boardState[loc]) {
      loc = Math.floor(Math.random() * 9 + 1)
    }
    boardState[loc] = {
      player: playerTurn,
      id: currPlayer[0]
    }
    let newPlayer = currPlayer.slice(1)
    this.setState({
      newBoardState,
      player1: playerTurn === 1 ? newPlayer : player1,
      player2: playerTurn === 2 ? newPlayer : player2,
      placedCards: placedCards + 1
    }, () => {
      this.checkPlacedCard(loc)
    })
  }

  checkPlacedCard (loc, user) {
    const {boardState, playerTurn, player1Points, player2Points} = this.state;
    const locationsToCheck = {
      1: [{loc: 2, dir: 'right'}, {loc: 4, dir: 'down'}],
      2: [{loc: 1, dir: 'left'}, {loc: 3, dir: 'right'}, {loc: 5, dir: 'down'}],
      3: [{loc: 2, dir: 'left'}, {loc: 6, dir: 'down'}],
      4: [{loc: 1, dir: 'up'}, {loc: 5, dir: 'right'}, {loc: 7, dir: 'down'}],
      5: [{loc: 2, dir: 'up'}, {loc: 4, dir: 'left'}, {loc: 6, dir: 'right'}, {loc: 8, dir: 'down'}],
      6: [{loc: 3, dir: 'up'}, {loc: 5, dir: 'left'}, {loc: 9, dir: 'down'}],
      7: [{loc: 4, dir: 'up'}, {loc: 8, dir: 'right'}],
      8: [{loc: 5, dir: 'up'}, {loc: 7, dir: 'left'}, {loc: 9, dir: 'right'}],
      9: [{loc: 6, dir: 'up'}, {loc: 8, dir: 'left'}]
    };
    let card = cards[boardState[loc].id - 1]
    const newBoardState = {
      ...boardState
    };
    let changes = 0

    locationsToCheck[loc].forEach((check) => {
      if (boardState[check.loc] && boardState[check.loc].player !== playerTurn) {
        let checker = cards[boardState[check.loc].id - 1]

        switch(check.dir) {
          case 'up':
            if (card.ranks[0] > checker.ranks[2]) {
              newBoardState[check.loc] = {
                id: checker.id,
                player: playerTurn
              }
              changes++
            }
            break;
          case 'right':
            if (card.ranks[1] > checker.ranks[3]) {
              newBoardState[check.loc] = {
                id: checker.id,
                player: playerTurn
              }
              changes++
            }
            break;
          case 'down':
            if (card.ranks[2] > checker.ranks[0]) {
              newBoardState[check.loc] = {
                id: checker.id,
                player: playerTurn
              }
              changes++
            }
            break;
          case 'left':
            if (card.ranks[3] > checker.ranks[1]) {
              newBoardState[check.loc] = {
                id: checker.id,
                player: playerTurn
              }
              changes++
            }
            break;
        };
      }
    })


    this.setState({
      player1Points: playerTurn === 1 ? player1Points + changes : player1Points - changes,
      player2Points: playerTurn === 2 ? player2Points + changes : player2Points - changes,
      boardState: newBoardState,
      playerTurn: playerTurn === 1 ? 2 : 1,
    }, () => {
      this.turnChange(user)
    })
  }

  login(user, password) {

    axios.get('/login', {
      headers: {
        user,
        password
      }
    })
      .then(response => {
        this.setState({
          user: response.data
        })
      })
      .catch(err => {
        let temp = "Login failed, please try again";
        if (err.response.data === "Incorrect Password") {
          temp = err.response.data;
        }
        this.setState({
          loginFailed: temp
        }, () => {
          setTimeout(() => {
            this.setState({
            loginFailed: false
            })
          }, 2000)
        })
      })
  }

  signup(user, password) {
    axios.post('/signup', {
      data: {
        user,
        password
      }
    })
      .then(response => {
        this.setState({
          user: response.data
        })
      })
      .catch(err => {
        let temp = "Sign up failed, please try again"
        if (err.response.data === "User Already Exists") {
          temp = err.response.data
        }
        this.setState({
          signupFailed: temp
        }, () => {
          setTimeout(() => {
            this.setState({
              signupFailed: false
            })
          }, 2000)
        })
      })
  }

  endGame () {
    const {player1Points, player2Points} = this.state;
    if (player1Points > player2Points) {
      alert('Player 1 Wins!')
    } else if (player2Points > player1Points) {
      alert('Player 2 Wins!')
    } else {
      alert('Draw!')
    }
    this.setState({
      boardState: {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
        9: undefined,
      },
      placedCards: 0,
      player1: [
        1,
        2,
        3,
        4,
        5
      ],
      player2: [
        10,
        11,
        12,
        13,
        14
      ],
      selectedCard: undefined,
      playerTurn: 1,
      player1Points: 5,
      player2Points: 5
    }, this.componentDidMount)
  }

  render() {
    const {user, boardState, player1, player2, playerTurn, selectedCard, loginFailed, signupFailed} = this.state;
    return user ? (
      <div id="board">
        <img id="boardImage" src="./img/board-mat.jpg" />
        <Hand player={2} hand={player2} handleCardClick={this.handleCardClick} playerTurn={playerTurn} selectedCard={selectedCard} />
        <div id="innerBoard">
          {Object.keys(boardState).map(loc => {
            return <BoardSlot loc={loc} card={boardState[loc]} handleBoardClick={this.handleBoardClick}/>
          })}
        </div>
        <Hand player={1} hand={player1} handleCardClick={this.handleCardClick} playerTurn={playerTurn} selectedCard={selectedCard} />
      </div>
    ) : (
      <Login login={this.login} signup={this.signup} loginFailed={loginFailed} signupFailed={signupFailed}/>
    )
  }
}
export default App;
