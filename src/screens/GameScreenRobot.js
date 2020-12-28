import React from 'react'
import {connect} from 'react-redux'

import BridgeGameEngine from '../engine/managers/BridgeGameEngine'
import GameScreen from './GameScreen'
import {setGameEngine} from '../redux/actions/Core'

import '../css/Style.css'

const {ALL_SEATS, SEATS} = require('../constants/GameEngine')


class GameScreenRobots extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setGameEngine(new BridgeGameEngine()));
  }

  render() {
    const me = ALL_SEATS[Math.floor(Math.random() * 4)];
    return (
      <GameScreen
        me={me}
        players={{
          [SEATS.NORTH]: "Robot",
          [SEATS.EAST]: "Robot",
          [SEATS.SOUTH]: "Robot",
          [SEATS.WEST]: "Robot",
          [me]: `${this.props.first_name}`,
        }}
        online={false}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    first_name: state.userDetails.first_name,
    curr_player: state.curr_player,
    game_engine: state.game_engine,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(GameScreenRobots);
