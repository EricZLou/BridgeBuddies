import React from 'react'
import {connect} from 'react-redux'

import Card from './Card'
import {sortHand} from './Deck'

import '../css/Hand.css'


class Hand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      sorted: false,
    }
    this.seat = this.props.seat;
  }

  componentDidUpdate() {
    if (this.state.cards && this.props.contract && !this.state.sorted) {
      this.setState({
        cards: sortHand(this.state.cards, this.props.contract.suit),
        sorted: true,
      });
    }
  }

  render() {
    const card_spacing = getComputedStyle(document.documentElement)
      .getPropertyValue('--card-spacing');
    let cards_list = [];
    if (this.state.cards) {
      cards_list = this.state.cards.map((card, idx) => {
        return (
          <div className="hand" style={{left: parseInt(card_spacing)*idx}} key={idx}>
            <Card
              value={card.value}
              suit={card.suit}
              handleCardPlay={this.props.handleCardPlay.bind(this)}
              visible={this.props.visible}
              hoverable={this.props.clickable}
            />
          </div>
        );
      });
    } else {
      for (let idx = 0; idx < 13; idx++) {
        cards_list.push(
          <div className="hand" style={{left: parseInt(card_spacing)*idx}} key={idx}>
            <Card visible={false}/>
          </div>
        )
      }
    }
    return (
      <div style={{position: 'absolute'}}>
        {cards_list}
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    contract: state.contract,
  }
}
export default connect(mapStateToProps)(Hand);
