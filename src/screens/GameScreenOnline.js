import React from 'react';
import {connect} from 'react-redux'

import BridgeGameEngine from '../engine/managers/BridgeGameEngine'
import GameScreen from './GameScreen'
import LoadingScreen from './LoadingScreen'
import {setGameEngine} from '../redux/actions/Core'

import '../css/Style.css'

const {SEATS} = require('../constants/GameEngine')


class GameScreenOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_info: null,
      ready: false,
    };
    this.props.dispatch(setGameEngine(new BridgeGameEngine()));
    this.cleanup = this.cleanup.bind(this);
    this.emitBidClick = this.emitBidClick.bind(this);
    this.emitCardClick = this.emitCardClick.bind(this);
  }

  cleanup() {
    this.props.mySocket.emit("leave online game");
  }

  emitBidClick(bid) {
    this.props.mySocket.emit("bid click", bid, this.state.game_info.me);
  }

  emitCardClick(card, seat) {
    this.props.mySocket.emit("card click", card, seat);
  }

  retrieveBidClick(bid, seat) {
    this.props.game_engine.doBid(bid, this.props.curr_player);
    this.updateBidsOnBoard(this.props.curr_player, bid);
    if (this.props.game_engine.isBiddingComplete()) {
      this.handleBiddingComplete();
    } else {
      this.goToNextPlayer();
    }
  }

  retreiveCardClick(card, seat) {

  }

  componentDidMount() {
    // clean up in case user reloads page
    window.addEventListener("beforeunload", this.cleanup);

    // initial game setup
    this.props.mySocket.on("game data", (game_info) => {
      this.setState({
        game_info: game_info,
      })
    });
    this.props.mySocket.on("start game", () => {
      this.setState({
        ready: true,
      });
    });

    // in-game play
    this.props.mySocket.on("bid click", (bid, seat) => {
      this.retrieveBidClick(bid, seat);
    });
    this.props.mySocket.on("card click", (card, seat) => {
      this.retreiveCardClick(card, seat);
    });

    // request a game
    this.props.mySocket.emit("online game request", this.props.first_name);
  }

  componentWillUnmount() {
    this.props.mySocket.emit("leave online game");
    window.removeEventListener("beforeunload", this.cleanup);
  }

  render() {
    if (!this.state.ready) return (<LoadingScreen text={"Waiting for 4 players..."}/>);
    return (
      <GameScreen
        me={this.state.game_info.me}
        players={{
          [SEATS.NORTH]: this.state.game_info[SEATS.NORTH],
          [SEATS.EAST]: this.state.game_info[SEATS.EAST],
          [SEATS.SOUTH]: this.state.game_info[SEATS.SOUTH],
          [SEATS.WEST]: this.state.game_info[SEATS.WEST],
        }}
        my_cards={this.state.game_info.cards}
        online={true}
        handleBidClick={this.emitBidClick}
        emitCardClick={this.emitCardClick}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    first_name: state.userDetails.first_name,
    mySocket: state.mySocket,
    curr_player: state.curr_player,
    game_engine: state.game_engine,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(GameScreenOnline);
