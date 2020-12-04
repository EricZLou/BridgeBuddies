import React from 'react';

import BiddingBox from '../engine/BiddingBox'
import BidsOnBoard from '../engine/BidsOnBoard'
import BridgeGameEngine from '../engine/managers/BridgeGameEngine'
import CardsOnBoard from '../engine/CardsOnBoard'
import CurrentGameStats from '../engine/CurrentGameStats'
import Deck, {sortHand} from '../engine/Deck'
import HeaderGame from '../components/HeaderGame'
import Player from '../engine/Player'
import ScoreSubScreen from '../screens/ScoreSubScreen'
import {ALL_SEATS, BID_TYPES, GAMESTATES, SEATS} from '../constants/Game'
import {getNextPlayer, getPrevPlayer, getPartner} from '../engine/utils/GameScreenUtils'

import '../css/Style.css';
import '../css/GameScreen.css';

import table from '../media/store/tables/green2.jpg'

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.me = ALL_SEATS[Math.floor(Math.random() * 4)];
    this.deck = new Deck();
    this.hands = this.deck.generateHands();
    this.north = this.hands[SEATS.NORTH];
    this.east = this.hands[SEATS.EAST];
    this.south = this.hands[SEATS.SOUTH];
    this.west = this.hands[SEATS.WEST];
    this.game_engine = new BridgeGameEngine();
    this.cards_on_board = [];
    this.bids_on_board = [];
    this.contract = null;
    this.state = {
      game_state: GAMESTATES.BIDDING,
      ready_to_play: false,
      curr_player: SEATS.SOUTH,
    };
    this.handleGameScreenClick = this.handleGameScreenClick.bind(this);
    this.handleBidClick = this.handleBidClick.bind(this);
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
        console.log(`[${seat}] Play ${card_played.suit} ${card_played.value}`);
        this[seat].splice(idx, 1);
        return;
      }
    }
  }

  updateCardsOnBoard(seat, card) {
    this.cards_on_board.push({seat: seat, card: card});
  }

  updateBidsOnBoard(seat, bid) {
    this.bids_on_board.push({seat: seat, bid: bid});
  }

  handleClearCardsEvent = (e) => {
    if (this.game_engine.isTrickOver()) {
      this.game_engine.clearTrick();
      this.cards_on_board = [];
      this.setState({
        ready_to_play: true,
      });
    }
    if (this.game_engine.isGameOver()) {
      this.setState({game_state: GAMESTATES.RESULTS});
    }
  }

  handleGameScreenClick(seat, card) {
    if (this.state.game_state !== GAMESTATES.PLAYING) return;
    if (this.state.curr_player === seat &&
        this.game_engine.isValidCard(card, this[seat])
    ) {
      this.game_engine.setDummy(getPartner(this.contract.declarer));
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

  handleBiddingComplete() {
    this.contract = this.game_engine.getContract();
    if (this.contract.suit === "pass") {
      this.setState({
        game_state: GAMESTATES.RESULTS,
      });
      return;
    }
    this.game_engine.setTrumpSuit(this.contract.suit);
    this.north = sortHand(this.north, this.contract.suit);
    this.east = sortHand(this.east, this.contract.suit);
    this.south = sortHand(this.south, this.contract.suit);
    this.west = sortHand(this.west, this.contract.suit);
    this.setState({
      game_state: GAMESTATES.PLAYING,
      curr_player: getNextPlayer(this.contract.declarer),
      ready_to_play: true,
    });
    // we set the dummy after the first card has been played above
  }

  handleBidClick(bid) {
    if (this.state.game_state !== GAMESTATES.BIDDING) return;
    if (this.game_engine.isValidBid(bid, this.state.curr_player)) {
      this.game_engine.doBid(bid, this.state.curr_player);
      this.updateBidsOnBoard(this.state.curr_player, bid);
      if (bid.type === BID_TYPES.SUIT) {
        console.log(`[${this.state.curr_player}] Bid ${bid.level}${bid.suit}`);
      } else {
        console.log(`[${this.state.curr_player}] Bid ${bid.type}`);
      }
      if (this.game_engine.isBiddingComplete()) {
        this.handleBiddingComplete();
      } else {
        this.goToNextPlayer();
      }
    }
  }

  resetGame() {
    this.game_engine.reset();
    this.hands = this.deck.generateHands();
    this.setState({
      game_state: GAMESTATES.BIDDING,
      ready_to_play: false,
      curr_player: SEATS.SOUTH,
    });
    this.north = this.hands[SEATS.NORTH];
    this.east = this.hands[SEATS.EAST];
    this.south = this.hands[SEATS.SOUTH];
    this.west = this.hands[SEATS.WEST];
    this.cards_on_board = [];
    this.bids_on_board = [];
  }

  createPlayer(seat) {
    return <Player
      seat={seat}
      cards={this[seat]}
      handlePlayerClick={this.handleGameScreenClick}
      is_my_turn={this.state.curr_player === seat}
      opening_suit={this.cards_on_board.length === 0 ? null : this.cards_on_board[0].card.suit}
      ready_to_play={this.state.ready_to_play}
      visible={seat === this.me || seat === this.game_engine.dummy}
      clickable={seat === this.me && seat !== this.game_engine.dummy ||
                 seat === getPartner(this.me) && seat === this.game_engine.dummy}
    />
  }

  render() {
    return (
      <div onMouseUp={this.handleClearCardsEvent}>
        <HeaderGame/>
        <img src={table} alt="table" className="table-image"/>

        {(this.state.game_state === GAMESTATES.BIDDING || this.state.game_state === GAMESTATES.PLAYING) &&
          <div className="game-container">

            <div className="top">
              <div className="left"/>
              <div className="middle">
                <div className="game-player">
                  {this.createPlayer(getPartner(this.me))}
                </div>
              </div>
              <div className="right"/>
            </div>

            <div className="middle">
              <div className="left">
                <div className="game-player">
                  {this.createPlayer(getNextPlayer(this.me))}
                </div>
              </div>
              <div className="middle">
                {this.state.game_state === GAMESTATES.BIDDING && <BidsOnBoard
                  bids={this.bids_on_board}
                />}
                {this.state.game_state === GAMESTATES.PLAYING && <CardsOnBoard
                  cards={this.cards_on_board}
                />}
              </div>
              <div className="right">
                <div className="game-player">
                  {this.createPlayer(getPrevPlayer(this.me))}
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="left"/>
              <div className="middle">
                <div className="game-player">
                  {this.createPlayer(this.me)}
                </div>
              </div>
              <div className="right">
                {(this.state.game_state === GAMESTATES.BIDDING) &&
                  <div className="bidding-box-container">
                    <BiddingBox
                      handleBidClick={this.handleBidClick}
                    />
                  </div>
                }
                {(this.state.game_state === GAMESTATES.PLAYING) &&
                  <div className="current-game-stats-container">
                    <CurrentGameStats
                      tricks_won_NS={this.game_engine.tricks_won_NS}
                      tricks_won_EW={this.game_engine.tricks_won_EW}
                      contract={this.game_engine.getContract()}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        }
        {(this.state.game_state === GAMESTATES.RESULTS) &&
          <ScoreSubScreen
            score={this.game_engine.tricks_won_NS}
            resetGame={this.resetGame}
          />
        }
      </div>
    );
  }
}
