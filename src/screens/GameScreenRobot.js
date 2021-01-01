import React from 'react'
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import OfflinePlayer from '../engine/players/OfflinePlayer'
import RobotPlayer from '../engine/players/RobotPlayer'
import {Deck} from '../engine/Deck'
import {newGame} from '../redux/actions/Core'

import '../css/Style.css'

import {ALL_SEATS, SEATS} from '../constants/GameEngine'


class GameScreenRobots extends React.Component {
  constructor(props) {
    super(props);
    this.me = ALL_SEATS[Math.floor(Math.random() * 4)];
  }

  componentDidMount() {
    const deck = new Deck();
    const all_hands = deck.generateHands();
    this.props.dispatch(newGame(all_hands));
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
        OpponentType = {RobotPlayer}
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
