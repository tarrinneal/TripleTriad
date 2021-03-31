import React from "react";
import cards from "../cardStats.js"

const Card = ({loc, card, player = 1, direction = 'up'}) => {
  return direction === 'up' ? (
    <div key={loc} className={`card ${cards[card - 1].id} ${loc}`}>
      <img className={'cardBackground'} src={`./img/card${player}.png`} />
      <img className={'cardImg'} src={`./img/cards/${card.toString().padStart(3, '0')}.png`} />
    </div>
  ) : (
    <div className={`card ${cards[card - 1].id}`}>
      <img key={loc} className={'cardBack'} src={`./img/card-back.png`} />
    </div>
  )
}

export default Card;
