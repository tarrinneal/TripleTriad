import React from "react";
import cards from "../cardStats.js"

const Card = ({loc, card, player = 1, direction = 'up', handleCardClick, order, playerTurn, selectedCard}) => {
  // debugger;
  return direction === 'up' ? (
    <div key={loc} className={`card ${cards[card - 1].id} ${loc} ${order === selectedCard && player === playerTurn ? 'selected' : ''}` } order={order} player={player} onClick={handleCardClick ? handleCardClick : null}>
      <img className={'cardBackground'} src={`./img/card${player}.png`} order={order} />
      <img className={'cardImg'} src={`./img/cards/${card.toString().padStart(3, '0')}.png`} order={order} />
      <img className={'rank top'} src={`./img/rank${cards[card - 1].ranks[0]}.png`} order={order} />
      <img className={'rank right'} src={`./img/rank${cards[card - 1].ranks[1]}.png`} order={order} />
      <img className={'rank bottom'} src={`./img/rank${cards[card - 1].ranks[2]}.png`} order={order} />
      <img className={'rank left'} src={`./img/rank${cards[card - 1].ranks[3]}.png`} order={order} />
    </div>
  ) : (
    <div className={`card ${cards[card - 1].id}`}>
      <img key={loc} className={'cardBack'} src={`./img/card-back.png`} />
    </div>
  )
}

export default Card;
