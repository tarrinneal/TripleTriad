import React from "react";
import Card from "./Card.jsx"

const BoardSlot = ({loc, card, handleBoardClick}) => {
  // debugger;
  let row = Math.ceil((9 - loc + 1) / 3)
  if (row === 1) {
    row = 3
  } else if (row === 3) {
    row = 1
  }
    return (
      <div key={loc} loc={loc} className={`boardSlot ${loc}`} style={{gridColumn: (loc % 3) || 3, gridRow: row}} onClick={handleBoardClick}>
       {card ? <Card player={card.player} card={card.id} loc={loc} /> : loc}
      </div>
    )
}

export default BoardSlot;
