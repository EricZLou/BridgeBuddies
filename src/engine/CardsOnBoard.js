import React from 'react'

import Card from './Card'
import {getNextPlayer, getPartner} from '../engine/utils/GameUtils'

import '../css/CardsOnBoard.css'


export default class CardsOnBoard extends React.Component {
  render() {
    const cards_list = this.props.cards_on_board.map((card_play, idx) => {
      let style;
      if (card_play.seat === this.props.me) style = {
        position: 'absolute',
        left: `calc(50% - ${this.props.variable_sizes.card_width}px / 2)`,
        bottom: `calc(50% - 0.8 * ${this.props.variable_sizes.card_height}px)`,
      };
      else if (card_play.seat === getPartner(this.props.me)) style = {
        position: 'absolute',
        left: `calc(50% - ${this.props.variable_sizes.card_width}px / 2)`,
        top: `calc(50% - 0.8 * ${this.props.variable_sizes.card_height}px)`,
      };
      else if (card_play.seat === getNextPlayer(this.props.me)) style = {
        position: 'absolute',
        left: `calc(50% - 0.8 * ${this.props.variable_sizes.card_width}px)`,
        top: `calc(50% - ${this.props.variable_sizes.card_height}px / 2)`,
      };
      else style = {
        position: 'absolute',
        right: `calc(50% - 0.8 * ${this.props.variable_sizes.card_width}px)`,
        top: `calc(50% - ${this.props.variable_sizes.card_height}px / 2 - ${this.props.variable_sizes.card_height}px / 10)`,
      };

      return (
        <div style={style} key={idx}>
          <Card
            value={card_play.card.value}
            suit={card_play.card.suit}
            handleCardClick={()=>{}}
            visible={true}
            onBoard={true}
            card_height={this.props.variable_sizes.card_height}
            card_width={this.props.variable_sizes.card_width}
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
