import React from "react";
import cards from "../cardStats.js"

const Card = ({loc, card, player = 1}) => {
  let row = Math.ceil((9 - loc + 1) / 3)
  if (row === 1) {
    row = 3
  } else if (row === 3) {
    row = 1
  }
    return (
      <div className={`card ${cards[card - 1].id}`}>
        <img className={'cardBackground'} src={`./img/card${player}.png`} />
        <img className={'cardImg'} src={`./img/cards/${card.toString().padStart(3, '0')}.png`} />
      </div>
    )
}
export default Card;
