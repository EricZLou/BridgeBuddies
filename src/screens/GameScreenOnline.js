import React from 'react';
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import {ALL_SEATS, SEATS} from '../constants/GameEngine'

import '../css/Style.css';

class GameScreenOnline extends React.Component {
  render() {
    const me = ALL_SEATS[Math.floor(Math.random() * 4)];
    return (
      <GameScreen
        me={me}
        players={{
          [SEATS.NORTH]: "Paul",
          [SEATS.EAST]: "Tim",
          [SEATS.SOUTH]: "Elizabeth",
          [SEATS.WEST]: "Chris",
          [me]: `${this.props.first_name}`,
        }}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    first_name: state.userDetails.first_name,
  }
}
export default connect(mapStateToProps)(GameScreenOnline);
