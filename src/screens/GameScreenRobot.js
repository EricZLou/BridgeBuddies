import React from 'react'
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import OfflinePlayer from '../engine/players/OfflinePlayer'
import RobotOpponent from '../engine/players/RobotOpponent'

import '../css/Style.css'

import {ALL_SEATS, SEATS} from '../constants/GameEngine'


class GameScreenRobots extends React.Component {
  constructor(props) {
    super(props);
    this.me = ALL_SEATS[Math.floor(Math.random() * 4)];
  }

  render() {
    return (
      <GameScreen
        me={this.me}
        players={{
          [SEATS.NORTH]: "Robot",
          [SEATS.EAST]: "Robot",
          [SEATS.SOUTH]: "Robot",
          [SEATS.WEST]: "Robot",
          [this.me]: `${this.props.first_name}`,
        }}
        PlayerType = {OfflinePlayer}
        OpponentType = {RobotOpponent}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    first_name: state.userDetails.first_name,
  }
}
export default connect(mapStateToProps)(GameScreenRobots);
