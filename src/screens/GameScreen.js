import React from 'react';

import Deck from '../engine/Deck'
import Hand from '../engine/Hand'
import HeaderGame from '../components/HeaderGame'
import {SEATS} from '../constants/Game'

import '../css/Style.css';
import '../css/GameScreen.css';

import table from '../media/store/tables/green.jpg'

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    let deck = new Deck();
    deck.shuffle();
    this.state = {
      hands: deck.generateHands(),
      JSON_hands: null,
    }
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
  }

  componentDidMount() {
    let JSON_hands_temp = {};
    for (let key in this.state.hands) {
      JSON_hands_temp[key] = this.state.hands[key].map((card) => JSON.stringify(card));
    }
    this.setState({JSON_hands: JSON_hands_temp});
  }

  handlePlayerClick(seat, suit, value) {
    const idx = (this.state.JSON_hands[seat]).indexOf(JSON.stringify({suit: suit, value: value}));
    console.log(`Clicked ${value} of ${suit} from Seat ${seat} at index ${idx}.`);
    let hands_copy = {...this.state.hands};
    let JSON_hands_copy = {...this.state.JSON_hands};
    (hands_copy[seat]).splice(idx, 1);
    (JSON_hands_copy[seat]).splice(idx, 1);
    this.setState({
      hands: hands_copy,
      JSON_hands: JSON_hands_copy,
    });
  }

  render() {
    return (
      <div>
        <HeaderGame/>
        <img src={table} alt="table" className="table-image"/>
        <div className="game-container">

          <div className="top">
            <div className="game-hand north">
              <Hand
                cards={this.state.hands[SEATS.NORTH]}
                seat={SEATS.NORTH}
                handleHandClick={this.handlePlayerClick}
              />
            </div>
          </div>

          <div className="middle">
            <div className="left">
              <div className="game-hand west">
                <Hand
                  cards={this.state.hands[SEATS.WEST]}
                  seat={SEATS.WEST}
                  handleHandClick={this.handlePlayerClick}
                />
              </div>
            </div>
            <div className="middle"/>
            <div className="right">
              <div className="game-hand east">
                <Hand
                  cards={this.state.hands[SEATS.EAST]}
                  seat={SEATS.EAST}
                  handleHandClick={this.handlePlayerClick}
                />
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="game-hand south">
              <Hand
                cards={this.state.hands[SEATS.SOUTH]}
                seat={SEATS.SOUTH}
                handleHandClick={this.handlePlayerClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
