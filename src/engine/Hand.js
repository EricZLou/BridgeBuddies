import React from 'react'

import Card from './Card'

import '../css/Hand.css'


export default class Hand extends React.Component {
  render() {
    if (!this.props.cards)
      return (<div/>);

    const card_spacing = this.props.variable_sizes.card_spacing;

    const cards_list = this.props.cards.map((card, idx) => {
      return (
        <div className="hand" style={{left: card_spacing*idx}} key={idx}>
          {Object.keys(card).length === 0 && <Card
            visible={false}
            card_height={this.props.variable_sizes.card_height}
            card_width={this.props.variable_sizes.card_width}
            card_back={this.props.card_back}
          />}
          {Object.keys(card).length !== 0 && <Card
            value={card.value}
            suit={card.suit}
            handleCardPlay={this.props.handleCardPlay.bind(this)}
            visible={this.props.visible}
            hoverable={this.props.clickable}
            card_height={this.props.variable_sizes.card_height}
            card_width={this.props.variable_sizes.card_width}
            card_back={this.props.card_back}
          />}
        </div>
      );
    });
    return (
      <div>
        {cards_list}
      </div>
    )
  }
};
