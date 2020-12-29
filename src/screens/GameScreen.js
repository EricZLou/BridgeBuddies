import React from 'react'
import {connect} from 'react-redux'

import BidsOnBoard from '../engine/BidsOnBoard'
import CardsOnBoard from '../engine/CardsOnBoard'
import CurrentGameStats from '../engine/CurrentGameStats'
import HeaderGame from '../components/HeaderGame'
import ScoreSubScreen from '../screens/ScoreSubScreen'
import {Deck} from '../engine/Deck'
import {game_engine} from '../engine/managers/BridgeGameEngine'
import {getNextPlayer, getPrevPlayer, getPartner} from '../engine/utils/GameScreenUtils'
import {setContract, setCurrPlayer, setGameState, setReadyToPlay} from '../redux/actions/Core'

import '../css/Style.css'
import '../css/GameScreen.css'

import table from '../media/store/tables/green2.jpg'

import {GAMESTATES, SEATS} from '../constants/GameEngine'


class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bids_on_board: [],
      cards_on_board: [],
      first_card_of_game_played: false,
    };
    this.me = this.props.me;
    if (!this.props.my_cards) {
      this.deck = new Deck();
      this.hands = this.deck.generateHands();
    } else {
      this.hands = {};
      this.hands[this.me] = this.props.my_cards;
    }
    this.updateBidsOnBoard = this.updateBidsOnBoard.bind(this);
    this.updateCardsOnBoard = this.updateCardsOnBoard.bind(this);
    this.handleBiddingComplete = this.handleBiddingComplete.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentWillUnmount() {
    game_engine.reset();
    this.props.dispatch(setContract(""));
    this.props.dispatch(setCurrPlayer(SEATS.SOUTH));
    this.props.dispatch(setGameState(GAMESTATES.BIDDING));
    this.props.dispatch(setReadyToPlay(false));
  }

  updateBidsOnBoard(seat, bid) {
    this.setState({
      bids_on_board: this.state.bids_on_board.concat({
        seat: seat, bid: bid
      })
    });
  }

  updateCardsOnBoard(seat, card) {
    let position;
    if (seat === this.me) position = "card-me";
    else if (seat === getPartner(this.me)) position = "card-partner";
    else if (seat === getNextPlayer(this.me)) position = "card-left";
    else position = "card-right";
    this.setState({
      cards_on_board: this.state.cards_on_board.concat({
        position: position, card: card
      })
    });
    if (!this.state.first_card_of_game_played)
      this.setState({first_card_of_game_played: true});
  }

  handleClearCardsEvent = (e) => {
    if (game_engine.isTrickOver()) {
      game_engine.clearTrick();
      this.setState({cards_on_board: []});
      this.props.dispatch(setReadyToPlay(true));
    }
    if (game_engine.isGameOver()) {
      this.props.dispatch(setGameState(GAMESTATES.RESULTS));
    }
  }

  handleBiddingComplete() {
    const contract = game_engine.getContract();
    this.props.dispatch(setContract(contract));
    if (contract.suit === "pass") {
      this.props.dispatch(setGameState(GAMESTATES.RESULTS));
      return;
    }
    game_engine.setTrumpSuit(contract.suit);
    game_engine.setDummy(getPartner(contract.declarer));

    this.props.dispatch(setCurrPlayer(getNextPlayer(contract.declarer)));
    this.props.dispatch(setGameState(GAMESTATES.PLAYING));
    this.props.dispatch(setReadyToPlay(true));
    // we set the dummy after the first card has been played above
  }

  resetGame() {
    game_engine.reset();
    this.hands = this.deck.generateHands();
    this.props.dispatch(setContract(""));
    this.props.dispatch(setCurrPlayer(SEATS.SOUTH));
    this.props.dispatch(setGameState(GAMESTATES.BIDDING));
    this.props.dispatch(setReadyToPlay(false));
    this.setState({
      bids_on_board: [],
      cards_on_board: [],
      first_card_of_game_played: false,
    });
  }

  render() {
    const partner = getPartner(this.me);
    const next_player = getNextPlayer(this.me);
    const prev_player = getPrevPlayer(this.me);

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
                  <this.props.OpponentType
                    seat={partner}
                    name={this.props.players[partner]}
                    cards={this.hands[partner]}
                    updateCardsOnBoard={this.updateCardsOnBoard}
                    updateBidsOnBoard={this.updateBidsOnBoard}
                    handleBiddingComplete={this.handleBiddingComplete}
                    visible={partner === game_engine.dummy && this.state.first_card_of_game_played}
                    clickable={partner === game_engine.dummy && this.state.first_card_of_game_played}
                  />
                </div>
              </div>
              <div className="right"/>
            </div>

            <div className="middle">
              <div className="left">
                <div className="game-player">
                  <this.props.OpponentType
                    seat={next_player}
                    name={this.props.players[next_player]}
                    cards={this.hands[next_player]}
                    updateCardsOnBoard={this.updateCardsOnBoard}
                    updateBidsOnBoard={this.updateBidsOnBoard}
                    handleBiddingComplete={this.handleBiddingComplete}
                    visible={next_player === game_engine.dummy && this.state.first_card_of_game_played}
                    clickable={false}
                  />
                </div>
              </div>
              <div className="middle">
                {this.props.game_state === GAMESTATES.BIDDING && <BidsOnBoard
                  bids={this.state.bids_on_board}
                />}
                {this.props.game_state === GAMESTATES.PLAYING && <CardsOnBoard
                  cards={this.state.cards_on_board}
                />}
              </div>
              <div className="right">
                <div className="game-player">
                  <this.props.OpponentType
                    seat={prev_player}
                    name={this.props.players[prev_player]}
                    cards={this.hands[prev_player]}
                    updateCardsOnBoard={this.updateCardsOnBoard}
                    updateBidsOnBoard={this.updateBidsOnBoard}
                    handleBiddingComplete={this.handleBiddingComplete}
                    visible={prev_player === game_engine.dummy && this.state.first_card_of_game_played}
                    clickable={false}
                  />
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="left"/>
              <div className="middle">
                <div className="game-player">
                  <this.props.PlayerType
                    seat={this.me}
                    name={this.props.players[this.me]}
                    cards={this.hands[this.me]}
                    updateCardsOnBoard={this.updateCardsOnBoard}
                    updateBidsOnBoard={this.updateBidsOnBoard}
                    handleBiddingComplete={this.handleBiddingComplete}
                    visible={true}
                    clickable={this.me !== game_engine.dummy}
                  />
                </div>
              </div>
              <div className="right">
                {(this.props.game_state === GAMESTATES.PLAYING) &&
                  <div className="current-game-stats-container">
                    <CurrentGameStats
                      tricks_won_NS={game_engine.tricks_won_NS}
                      tricks_won_EW={game_engine.tricks_won_EW}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        }
        {(this.props.game_state === GAMESTATES.RESULTS) &&
          <ScoreSubScreen
            score={game_engine.getMyScore(this.me)}
            resetGame={this.resetGame}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    game_state: state.game_state,
  }
}
export default connect(mapStateToProps)(GameScreen);
