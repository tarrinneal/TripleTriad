import React from "react";
import BoardSlot from "./BoardSlot.jsx"
import Hand from "./Hand.jsx"


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      boardState: {
        1: 1,
        2: 2,
        3: 3,
        4: 5,
        5: 4,
        6: 6,
        7: 7,
        8: 8,
        9: 9
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
      ]
    };
  }


  render() {
    const {boardState, player1, player2} = this.state;
    return (
      <div id="board">
        <img id="boardImage" src="./img/board-mat.jpg"/>
        <Hand player={1} hand={player1}/>
        <div id="innerBoard">
          {Object.keys(boardState).map(loc => {
            return <BoardSlot loc={loc} card={boardState[loc]} />
          })}
        </div>
        <Hand player={2} hand={player2}/>
      </div>

    )
  }
}
export default App;
