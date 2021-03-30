import React from "react";
import BoardSlot from "./BoardSlot.jsx"


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
    };
  }


  render() {
    const {boardState} = this.state;
    return (

      <div id="board">
        <img id="boardImage" src="./img/board-mat.jpg"/>
        <div id="innerBoard">
          {Object.keys(boardState).map(loc => {
            return <BoardSlot loc={loc} card={boardState[loc]} />
          })}
        </div>
      </div>

    )
  }
}
export default App;
