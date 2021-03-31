import React from "react";
import anime from "animejs";
import BoardSlot from "./BoardSlot.jsx";
import Hand from "./Hand.jsx";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
      playerTurn: 1
    };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
  }

  componentDidMount () {
    let reroll = () => {
      return Math.floor(Math.random() * 111)
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
      ]
    })
  }

  handleCardClick (e) {
    // let el = e.target
    this.setState({
      selectedCard: +e.target.attributes[2].nodeValue
    })
    // anime({
    //   targets: el,
    //   translateX: -50
    // })
  }

  handleBoardClick (e) {
    const {selectedCard, boardState, playerTurn, player1, player2} = this.state
    if (selectedCard && !boardState[e.target.attributes[0].nodeValue] && !isNaN(+e.target.attributes[0].nodeValue)) {

      let currPlayer = playerTurn === 1 ? player1 : player2;
      let newBoardState = {
        ...boardState
      }
      boardState[+e.target.attributes[0].nodeValue] = {
        player: playerTurn,
        id: currPlayer[+selectedCard- 1]
      }
      let newPlayer = currPlayer.slice(0, selectedCard - 1).concat(currPlayer.slice(selectedCard))
      this.setState({
        newBoardState,
        selectedCard: undefined,
        player1: playerTurn === 1 ? newPlayer : player1,
        player2: playerTurn === 2 ? newPlayer : player2
      })

    }
  }


  render() {
    const {boardState, player1, player2, playerTurn, selectedCard} = this.state;
    return (
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
    )
  }
}
export default App;
