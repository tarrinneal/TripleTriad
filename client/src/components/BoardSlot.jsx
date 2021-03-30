import React from "react";
import Card from "./Card.jsx"

const BoardSlot = ({loc, card}) => {
  let row = Math.ceil((9 - loc + 1) / 3)
  if (row === 1) {
    row = 3
  } else if (row === 3) {
    row = 1
  }
    return (
      <div key={loc} className={`boardSlot ${loc}`} style={{gridColumn: (loc % 3) || 3, gridRow: row}}>
       {card ? <Card card={card} /> : loc}
      </div>
    )
}
export default BoardSlot;
