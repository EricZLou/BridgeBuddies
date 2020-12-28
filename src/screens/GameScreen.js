import React from 'react'
import {connect} from 'react-redux'

import BiddingBox from '../engine/BiddingBox'
import BidsOnBoard from '../engine/BidsOnBoard'
import CardsOnBoard from '../engine/CardsOnBoard'
import CurrentGameStats from '../engine/CurrentGameStats'
import HeaderGame from '../components/HeaderGame'
import OnlinePlayer from '../engine/players/OnlinePlayer'
import Player from '../engine/players/Player'
import RobotPlayer from '../engine/players/RobotPlayer'
import ScoreSubScreen from '../screens/ScoreSubScreen'
import {getNextPlayer, getPrevPlayer, getPartner} from '../engine/utils/GameScreenUtils'
import {setContract, setCurrPlayer, setGameEngine, setGameState, setReadyToPlay} from '../redux/actions/Core'

import '../css/Style.css'
import '../css/GameScreen.css'

import table from '../media/store/tables/green2.jpg'

import {Deck, sortHand} from '../engine/Deck'
import {BID_TYPES, GAMESTATES, SEATS} from '../constants/GameEngine'


class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.me = this.props.me;
    this.players = this.props.players;
    if (!this.props.my_cards) {
      this.deck = new Deck();
      this.hands = this.deck.generateHands();
      this.north = this.hands[SEATS.NORTH];
      this.east = this.hands[SEATS.EAST];
      this.south = this.hands[SEATS.SOUTH];
      this.west = this.hands[SEATS.WEST];
    } else {
      this[this.me] = this.props.my_cards;
    }
    this.cards_on_board = [];
    this.bids_on_board = [];
    this.handleBidClick = this.handleBidClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(setContract(""));
    this.props.dispatch(setCurrPlayer(SEATS.SOUTH));
    this.props.dispatch(setGameEngine(""));
    this.props.dispatch(setGameState(GAMESTATES.BIDDING));
    this.props.dispatch(setReadyToPlay(false));
  }

  goToNextPlayer() {
    if (this.props.curr_player === SEATS.NORTH)
      this.props.dispatch(setCurrPlayer(SEATS.EAST));
    else if (this.props.curr_player === SEATS.EAST)
      this.props.dispatch(setCurrPlayer(SEATS.SOUTH));
    else if (this.props.curr_player === SEATS.SOUTH)
      this.props.dispatch(setCurrPlayer(SEATS.WEST));
    else if (this.props.curr_player === SEATS.WEST)
      this.props.dispatch(setCurrPlayer(SEATS.NORTH));
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
    let position;
    if (seat === this.me) position = "card-me";
    else if (seat === getPartner(this.me)) position = "card-partner";
    else if (seat === getNextPlayer(this.me)) position = "card-left";
    else position = "card-right";
    this.cards_on_board.push({position: position, card: card});
  }

  updateBidsOnBoard(seat, bid) {
    this.bids_on_board.push({seat: seat, bid: bid});
  }

  handleClearCardsEvent = (e) => {
    if (this.props.game_engine.isTrickOver()) {
      this.props.game_engine.clearTrick();
      this.cards_on_board = [];
      this.props.dispatch(setReadyToPlay(true));
    }
    if (this.props.game_engine.isGameOver()) {
      this.props.dispatch(setGameState(GAMESTATES.RESULTS));
    }
  }

  handleBiddingComplete() {
    const contract = this.props.game_engine.getContract();
    this.props.dispatch(setContract(contract));
    if (contract.suit === "pass") {
      this.props.dispatch(setGameState(GAMESTATES.RESULTS));
      return;
    }
    this.props.game_engine.setTrumpSuit(contract.suit);
    this.north = sortHand(this.north, contract.suit);
    this.east = sortHand(this.east, contract.suit);
    this.south = sortHand(this.south, contract.suit);
    this.west = sortHand(this.west, contract.suit);

    this.props.dispatch(setCurrPlayer(getNextPlayer(contract.declarer)));
    this.props.dispatch(setGameState(GAMESTATES.PLAYING));
    this.props.dispatch(setReadyToPlay(true));
    // we set the dummy after the first card has been played above
  }

  handleBidClick(bid) {
    if (this.props.game_state !== GAMESTATES.BIDDING) return;
    if (this.props.game_engine.isValidBid(bid, this.props.curr_player)) {
      if (this.props.online) this.props.handleBidClick(bid);
      this.props.game_engine.doBid(bid, this.props.curr_player);
      this.updateBidsOnBoard(this.props.curr_player, bid);
      if (bid.type === BID_TYPES.SUIT) {
        console.log(`[${this.props.curr_player}] Bid ${bid.level}${bid.suit}`);
      } else {
        console.log(`[${this.props.curr_player}] Bid ${bid.type}`);
      }
      if (this.props.game_engine.isBiddingComplete()) {
        this.handleBiddingComplete();
      } else {
        this.goToNextPlayer();
      }
    }
  }

  resetGame() {
    this.props.game_engine.reset();
    // this.hands = this.deck.generateHands();
    this.props.dispatch(setCurrPlayer(SEATS.SOUTH));
    this.props.dispatch(setGameState(GAMESTATES.BIDDING));
    this.props.dispatch(setReadyToPlay(false));
    this.north = this.hands[SEATS.NORTH];
    this.east = this.hands[SEATS.EAST];
    this.south = this.hands[SEATS.SOUTH];
    this.west = this.hands[SEATS.WEST];
    this.cards_on_board = [];
    this.bids_on_board = [];
  }

  createPlayer(seat) {
    let PlayerType;
    if (seat === this.me) PlayerType = Player;
    else if (this.props.online) PlayerType = OnlinePlayer;
    else PlayerType = RobotPlayer;
    return <PlayerType
      seat={seat}
      name={this.players[seat]}
      cards={this[seat]}
      handlePlayerClick={this.handleGameScreenClick}
      is_my_turn={this.props.curr_player === seat}
      opening_suit={this.cards_on_board.length === 0 ? null : this.cards_on_board[0].card.suit}
      ready_to_play={this.props.ready_to_play}
      visible={seat === this.me || seat === this.props.game_engine.dummy}
      clickable={(seat === this.me && seat !== this.props.game_engine.dummy) ||
                 (seat === getPartner(this.me) && seat === this.props.game_engine.dummy)}
    />
  }

  render() {
    return (
      <div>
        <HeaderGame/>
        <img src={table} alt="table" className="table-image"/>

        {(this.props.game_state === GAMESTATES.BIDDING || this.props.game_state === GAMESTATES.PLAYING) &&
          <div className="game-container" onMouseUp={this.handleClearCardsEvent}>

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
                {this.props.game_state === GAMESTATES.BIDDING && <BidsOnBoard
                  bids={this.bids_on_board}
                />}
                {this.props.game_state === GAMESTATES.PLAYING && <CardsOnBoard
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
                {(this.props.game_state === GAMESTATES.BIDDING) &&
                  <div className="bidding-box-container">
                    <BiddingBox
                      handleBidClick={this.handleBidClick}
                    />
                  </div>
                }
                {(this.props.game_state === GAMESTATES.PLAYING) &&
                  <div className="current-game-stats-container">
                    <CurrentGameStats
                      tricks_won_NS={this.props.game_engine.tricks_won_NS}
                      tricks_won_EW={this.props.game_engine.tricks_won_EW}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        }
        {(this.props.game_state === GAMESTATES.RESULTS) &&
          <ScoreSubScreen
            score={this.props.game_engine.getMyScore(this.me)}
            resetGame={this.resetGame}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contract: state.contract,
    curr_player: state.curr_player,
    game_engine: state.game_engine,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(GameScreen);
