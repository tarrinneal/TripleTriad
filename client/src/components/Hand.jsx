import React from "react";
import Card from "./Card.jsx"

const Hand = ({player, hand, handleCardClick, selectedCard, playerTurn}) => {
  let order = 1;
  return (
    <div className={`hand player${player}`}>
      {
        hand.map(id => {
          return <Card card={id} player={player} direction={player === 1 ? 'up' : 'down'} order={order} loc={`player${player}card${order++}`} handleCardClick={handleCardClick} selectedCard={selectedCard} playerTurn={playerTurn} />
        })
      }
    </div>
  )
}

export default Hand;
