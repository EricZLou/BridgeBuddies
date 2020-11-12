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
    this.hands = deck.generateHands();
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
  }

  handlePlayerClick(seat, suit, value) {
    console.log(`Clicked ${value} of ${suit} from Seat ${seat}.`);

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
                cards={this.hands[SEATS.NORTH]}
                seat={SEATS.NORTH}
                handleHandClick={this.handlePlayerClick}
              />
            </div>
          </div>

          <div className="middle">
            <div className="left">
              <div className="game-hand west">
                <Hand
                  cards={this.hands[SEATS.WEST]}
                  seat={SEATS.WEST}
                  handleHandClick={this.handlePlayerClick}
                />
              </div>
            </div>
            <div className="middle"/>
            <div className="right">
              <div className="game-hand east">
                <Hand
                  cards={this.hands[SEATS.EAST]}
                  seat={SEATS.EAST}
                  handleHandClick={this.handlePlayerClick}
                />
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="game-hand south">
              <Hand
                cards={this.hands[SEATS.SOUTH]}
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
