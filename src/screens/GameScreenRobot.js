import React from 'react'
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import OfflinePlayer from '../engine/players/OfflinePlayer'
import RobotPlayer from '../engine/players/RobotPlayer'
import {Deck} from '../engine/Deck'
import {newGame, setPlayerTypes} from '../redux/actions/Core'

import '../css/Style.css'

import {ALL_SEATS, SEATS} from '../constants/GameEngine'


class GameScreenRobots extends React.Component {
  constructor(props) {
    super(props);
    this.me = ALL_SEATS[Math.floor(Math.random() * 4)];
  }

  componentDidMount() {
    this.props.dispatch(setPlayerTypes({
      [SEATS.NORTH]: RobotPlayer,
      [SEATS.EAST]: RobotPlayer,
      [SEATS.SOUTH]: RobotPlayer,
      [SEATS.WEST]: RobotPlayer,
      [this.me]: OfflinePlayer,
    }));
    this.deck = new Deck();
    this.props.dispatch(newGame(this.deck.generateHands()));
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
        online={false}
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
