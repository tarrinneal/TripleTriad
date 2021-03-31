import React from "react";
import Card from "./Card.jsx"

const Hand = ({player, hand}) => {
  let order = 1;
  return (
    <div className={`hand player${player}`}>
      {
        hand.map(id => {
          return <Card card={id} player={player} direction={player === 1 ? 'up' : 'down'} loc={`player${player}card${order++}`}/>
        })
      }
    </div>
  )
}
export default Hand;
