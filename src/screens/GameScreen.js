import React from 'react';

import Deck from '../engine/Deck'
import Hand from '../engine/Hand'
import HeaderGame from '../components/HeaderGame'
import Loading from '../components/Loading'

import '../css/Style.css';
import '../css/GameScreen.css';

import table from '../media/store/tables/green.jpg'

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    let deck = new Deck();
    deck.shuffle();
    this.hands = deck.generateHands();
  }

  componentDidMount() {
    this.setState({loaded: true});
  }

  render() {
    return (
      <div>
        {
          this.state.loaded ? (
            <div>
              <HeaderGame/>
              <img src={table} alt="table" className="table-image"/>
              <div className="game-container">

                <div className="top">
                  <div className="game-hand north">
                    <Hand cards={this.hands[0]}/>
                  </div>
                </div>

                <div className="middle">
                  <div className="left">
                    <div className="game-hand west">
                      <Hand cards={this.hands[3]}/>
                    </div>
                  </div>
                  <div className="middle"/>
                  <div className="right">
                    <div className="game-hand east">
                      <Hand cards={this.hands[1]}/>
                    </div>
                  </div>
                </div>

                <div className="bottom">
                  <div className="game-hand south">
                    <Hand cards={this.hands[2]}/>
                  </div>
                </div>
              </div>
            </div>
          ) : <Loading/>
        }
      </div>
    );
  }
};
