import React from 'react';
import {connect} from 'react-redux'

import BridgeGameEngine from '../engine/managers/BridgeGameEngine'
import GameScreen from './GameScreen'
import LoadingScreen from './LoadingScreen'
import {SEATS} from '../constants/GameEngine'
import {setCurrPlayer, setGameEngine, setGameState, setReadyToPlay} from '../redux/actions/Core'

import '../css/Style.css'

class GameScreenOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_info: null,
      ready: false,
    };
    this.props.dispatch(setGameEngine(new BridgeGameEngine()));
    this.cleanup = this.cleanup.bind(this);
  }

  cleanup() {
    this.props.mySocket.emit("leave online game");
  }

  componentDidMount() {
    // clean up in case user reloads page
    window.addEventListener("beforeunload", this.cleanup);
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
