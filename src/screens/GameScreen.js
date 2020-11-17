import React from 'react';

import BridgeGameEngine from '../engine/BridgeGameEngine'
import CardsOnBoard from '../engine/CardsOnBoard'
import Deck from '../engine/Deck'
import HeaderGame from '../components/HeaderGame'
import Player from '../engine/Player'
import ScoreSubScreen from '../screens/ScoreSubScreen'
import {SEATS} from '../constants/Game'

import '../css/Style.css';
import '../css/GameScreen.css';

import table from '../media/store/tables/green.jpg'

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.state = {
      hands: this.deck.generateHands(),
      ready_to_play: true,
      game_over: false,
    };
    this.game_engine = new BridgeGameEngine();
    this.cards_on_board = [];
    this.handleGameScreenClick = this.handleGameScreenClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  updateHands(seat, card_played) {
    let card_played_idx = -1;
    for (let idx in this.state.hands[seat]) {
      if (JSON.stringify(this.state.hands[seat][idx]) === JSON.stringify(card_played)) {
        card_played_idx = idx;
        break;
      }
    }
    console.log(`[${seat}] ${card_played.suit} ${card_played.value} at index ${card_played_idx}.`);
    let hands_copy = {...this.state.hands};
    (hands_copy[seat]).splice(card_played_idx, 1);
    this.setState({
      hands: hands_copy,
    });
  }

  updateCardsOnBoard(seat, card) {
    this.cards_on_board.push(card);
  }

  handleClearCardsEvent = (e) => {
    if (this.game_engine.isTrickOver()) {
      const winner = this.game_engine.getRoundWinner();
      this.game_engine.setCurrPlayer(winner);
      this.game_engine.clearTrick();
      this.cards_on_board = [];
      this.setState({ready_to_play: true});
    }
    if (this.game_engine.isGameOver()) {
      this.setState({game_over: true});
    }
  }

  handleGameScreenClick(seat, card) {
    if (this.game_engine.isMyTurn(seat) &&
        this.game_engine.isValidCard(card, this.state.hands[seat])
    ) {
      this.game_engine.playCard(card, seat);
      this.updateHands(seat, card);
      this.updateCardsOnBoard(seat, card);
      this.game_engine.goToNextPlayer();
      if (this.game_engine.isTrickOver()) {
        this.setState({ready_to_play: false});
      }
    }
  }

  resetGame() {
    this.game_engine.reset();
    this.cards_on_board = [];
    this.setState({
      hands: this.deck.generateHands(),
      ready_to_play: true,
      game_over: false,
    });
  }

  render() {
    return (
      <div onMouseUp={this.handleClearCardsEvent}>
        <HeaderGame/>
        <img src={table} alt="table" className="table-image"/>
        {!this.state.game_over ?
          <div className="game-container">

            <div className="top">
              <div className="left"/>
              <div className="middle">
                <div className="game-player north">
                  <Player
                    cards={this.state.hands[SEATS.NORTH]}
                    seat={SEATS.NORTH}
                    handlePlayerClick={this.handleGameScreenClick}
                    is_my_turn={this.game_engine.curr_player === SEATS.NORTH}
                    cards_on_board={this.cards_on_board}
                    ready_to_play={this.state.ready_to_play}
                    visible={this.game_engine.dummy === SEATS.NORTH}
                  />
                </div>
              </div>
              <div className="right"/>
            </div>

            <div className="middle">
              <div className="left">
                <div className="game-player west">
                  <Player
                    cards={this.state.hands[SEATS.WEST]}
                    seat={SEATS.WEST}
                    handlePlayerClick={this.handleGameScreenClick}
                    is_my_turn={this.game_engine.curr_player === SEATS.WEST}
                    cards_on_board={this.cards_on_board}
                    ready_to_play={this.state.ready_to_play}
                    visible={this.game_engine.dummy === SEATS.WEST}
                  />
                </div>
              </div>
              <div className="middle">
                <CardsOnBoard
                  cards={this.cards_on_board}
                />
              </div>
              <div className="right">
                <div className="game-player east">
                  <Player
                    cards={this.state.hands[SEATS.EAST]}
                    seat={SEATS.EAST}
                    handlePlayerClick={this.handleGameScreenClick}
                    is_my_turn={this.game_engine.curr_player === SEATS.EAST}
                    cards_on_board={this.cards_on_board}
                    ready_to_play={this.state.ready_to_play}
                    visible={this.game_engine.dummy === SEATS.EAST}
                  />
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="left"/>
              <div className="middle">
                <div className="game-player south">
                  <Player
                    cards={this.state.hands[SEATS.SOUTH]}
                    seat={SEATS.SOUTH}
                    handlePlayerClick={this.handleGameScreenClick}
                    is_my_turn={this.game_engine.curr_player === SEATS.SOUTH}
                    cards_on_board={this.cards_on_board}
                    ready_to_play={this.state.ready_to_play}
                    visible={true}
                  />
                </div>
              </div>
              <div className="right"/>
            </div>
          </div>
          : <ScoreSubScreen
            score={this.game_engine.tricks_won_NS}
            resetGame={this.resetGame}
          />
        }
      </div>
    );
  }
};
