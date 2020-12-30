import React from 'react'
import {connect} from 'react-redux'

import Card from './Card'
import {getNextPlayer, getPartner} from '../engine/utils/GameScreenUtils'

import '../css/CardsOnBoard.css'


class CardsOnBoard extends React.Component {
  render() {
    const cards_list = this.props.cards_on_board.map((card_play, idx) => {
      let position;
      if (card_play.seat === this.props.me) position = "card-me";
      else if (card_play.seat === getPartner(this.props.me)) position = "card-partner";
      else if (card_play.seat === getNextPlayer(this.props.me)) position = "card-left";
      else position = "card-right";
      return (
        <div className={position} key={idx}>
          <Card
            value={card_play.card.value}
            suit={card_play.card.suit}
            handleCardClick={()=>{}}
            visible={true}
            onBoard={true}
          />
        </div>
      );
    });
    return (
      <div className="cards-on-board-container">
        {cards_list}
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    cards_on_board: state.cards_on_board,
  }
}
export default connect(mapStateToProps)(CardsOnBoard);
