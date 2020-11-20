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
    this.hands = this.deck.generateHands();
    this.north = this.hands[SEATS.NORTH];
    this.east = this.hands[SEATS.EAST];
    this.south = this.hands[SEATS.SOUTH];
    this.west = this.hands[SEATS.WEST];
    this.game_engine = new BridgeGameEngine();
    this.cards_on_board = [];
    this.state = {
      ready_to_play: true,
      game_over: false,
      curr_player: SEATS.SOUTH,
    };
    this.handleGameScreenClick = this.handleGameScreenClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  goToNextPlayer() {
    if (this.state.curr_player === SEATS.NORTH)
      this.setState({curr_player: SEATS.EAST});
    else if (this.state.curr_player === SEATS.EAST)
      this.setState({curr_player: SEATS.SOUTH});
    else if (this.state.curr_player === SEATS.SOUTH)
      this.setState({curr_player: SEATS.WEST});
    else if (this.state.curr_player === SEATS.WEST)
      this.setState({curr_player: SEATS.NORTH});
  }

  updateHands(seat, card_played) {
    for (let idx in this[seat]) {
      if (JSON.stringify(this[seat][idx]) === JSON.stringify(card_played)) {
        console.log(`[${seat}] ${card_played.suit} ${card_played.value}`);
        this[seat].splice(idx, 1);
        return;
      }
    }
  }

  updateCardsOnBoard(seat, card) {
    this.cards_on_board.push(card);
  }

  handleClearCardsEvent = (e) => {
    if (this.game_engine.isTrickOver()) {
      this.game_engine.clearTrick();
      this.cards_on_board = [];
      this.setState({
        ready_to_play: true,
        opening_suit: null,
      });
    }
    if (this.game_engine.isGameOver()) {
      this.setState({game_over: true});
    }
  }

  handleGameScreenClick(seat, card) {
    if (this.state.curr_player === seat &&
        this.game_engine.isValidCard(card, this[seat])
    ) {
      this.game_engine.playCard(card, seat);
      this.updateHands(seat, card);
      this.updateCardsOnBoard(seat, card);
      if (this.game_engine.isTrickOver()) {
        this.setState({
          ready_to_play: false,
          curr_player: this.game_engine.getRoundWinner(),
        });
      } else {
        this.goToNextPlayer();
      }
    }
  }

  resetGame() {
    this.game_engine.reset();
    this.hands = this.deck.generateHands();
    this.setState({
      opening_suit: null,
      ready_to_play: true,
      game_over: false,
      curr_player: SEATS.SOUTH,
    });
    this.north = this.hands[SEATS.NORTH];
    this.east = this.hands[SEATS.EAST];
    this.south = this.hands[SEATS.SOUTH];
    this.west = this.hands[SEATS.WEST];
    this.cards_on_board = [];
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
                    seat={SEATS.NORTH}
                    cards={this[SEATS.NORTH]}
                    handlePlayerClick={this.handleGameScreenClick}
                    is_my_turn={this.state.curr_player === SEATS.NORTH}
                    opening_suit={this.cards_on_board.length === 0 ? null : this.cards_on_board[0].suit}
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
                    seat={SEATS.WEST}
                    cards={this[SEATS.WEST]}
                    handlePlayerClick={this.handleGameScreenClick}
                    is_my_turn={this.state.curr_player === SEATS.WEST}
                    opening_suit={this.cards_on_board.length === 0 ? null : this.cards_on_board[0].suit}
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
                    seat={SEATS.EAST}
                    cards={this[SEATS.EAST]}
                    handlePlayerClick={this.handleGameScreenClick}
                    is_my_turn={this.state.curr_player === SEATS.EAST}
                    opening_suit={this.cards_on_board.length === 0 ? null : this.cards_on_board[0].suit}
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
                    seat={SEATS.SOUTH}
                    cards={this[SEATS.SOUTH]}
                    handlePlayerClick={this.handleGameScreenClick}
                    is_my_turn={this.state.curr_player === SEATS.SOUTH}
                    opening_suit={this.cards_on_board.length === 0 ? null : this.cards_on_board[0].suit}
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
