import React from 'react';
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import LoadingScreen from './LoadingScreen'
import {ALL_SEATS, SEATS} from '../constants/GameEngine'

import '../css/Style.css';

class GameScreenOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
    this.cleanup = this.cleanup.bind(this);
  }

  cleanup() {
    this.props.mySocket.emit("leave online game");
  }

  componentDidMount() {
    // clean up in case user reloads page
    window.addEventListener("beforeunload", this.cleanup);
    this.props.mySocket.on("start game", (game_info) => {
      console.log(game_info);
      this.setState({ready: true});
    });
    this.props.mySocket.emit("online game request", this.props.first_name);
  }

  componentWillUnmount() {
    this.props.mySocket.emit("leave online game");
    window.removeEventListener("beforeunload", this.cleanup);
  }

  render() {
    const me = ALL_SEATS[Math.floor(Math.random() * 4)];
    if (!this.state.ready) return (<LoadingScreen text={"Waiting for 4 players..."}/>);
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
    mySocket: state.mySocket,
  }
}
export default connect(mapStateToProps)(GameScreenOnline);
