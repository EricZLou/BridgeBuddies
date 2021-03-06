import React from 'react';
import {connect} from 'react-redux'

import GameScreen from './GameScreen'
import LoadingScreen from './LoadingScreen'
import {
  isBiddingComplete
} from '../engine/managers/BridgeGameEngine'
import {
  finishPlaying, makeBid, newGame, playCard, setHand,
  setOnlineRobots, startOnlineGameOverTimer,
} from '../redux/actions/Core'
import {sortHand} from '../engine/Deck'

import '../css/Style.css'

import {GAMESTATES, GAMETYPES, SEATS} from '../constants/GameEngine'


class GameScreenOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_users: 0,
      ready: false,
      room: "",
    };
    this.game_info = null;
    this.cleanup = this.cleanup.bind(this);
  }

  cleanup() {
    // waiting for game to be dispatched
    this.props.mySocket.off("room stat");

    // initial game setup
    this.props.mySocket.off("game data");
    this.props.mySocket.off("start game");

    // in-game play
    this.props.mySocket.off("bid click");
    this.props.mySocket.off("dummy hand");
    this.props.mySocket.off("card click");
    this.props.mySocket.off("partner hand");

    // game over
    this.props.mySocket.off("game over");

    this.props.mySocket.emit("leave online game");
  }

  componentDidMount() {
    // clean up in case user reloads page
    window.addEventListener("beforeunload", this.cleanup);

    // waiting for game to be dispatched
    this.props.mySocket.on("room stat", (room, num_users) => {
      this.setState({
        room: room,
        num_users: num_users,
      });
    });

    // initial game setup
    this.props.mySocket.on("game data", (game_info) => {
      this.game_info = game_info;
      let other_hands = [];
      for (let i = 1; i <= 13; i++) {
        other_hands.push({});
      }
      const all_hands = {
        [SEATS.NORTH]: [...other_hands],
        [SEATS.EAST]: [...other_hands],
        [SEATS.SOUTH]: [...other_hands],
        [SEATS.WEST]: [...other_hands],
        [game_info.me]: game_info.cards,
      };
      this.props.dispatch(newGame({
        game_type: GAMETYPES.ONLINE,
        me: game_info.me,
        player_names: {
          [SEATS.NORTH]: game_info[SEATS.NORTH],
          [SEATS.EAST]: game_info[SEATS.EAST],
          [SEATS.SOUTH]: game_info[SEATS.SOUTH],
          [SEATS.WEST]: game_info[SEATS.WEST],
        },
        hands: all_hands,
      }));
    });
    this.props.mySocket.on("start game", () => {
      this.setState({
        ready: true,
      });
    });

    // in-game play
    this.props.mySocket.on("bid click", (bid, seat) => {
      if (bid.level)
        console.log(`[GAME PLAY] ${seat} bids ${bid.level}${bid.suit}`);
      else
        console.log(`[GAME PLAY] ${seat} bids ${bid.type}`);
      this.props.dispatch(makeBid({bid: bid, seat: seat}));
      if (isBiddingComplete(this.props.bid_history) && this.game_info.me === this.props.dummy) {
        this.props.mySocket.emit("bidding over", this.props.dummy);
      }
    });
    this.props.mySocket.on("dummy hand", (cards) => {
      cards = sortHand(cards, this.props.contract.suit);
      this.props.dispatch(setHand({seat: this.props.dummy, cards: cards}));
    });
    this.props.mySocket.on("card click", (card, seat) => {
      console.log(`[GAME PLAY] ${seat} plays ${card.value}${card.suit}`);
      this.props.dispatch(playCard({card: card, seat: seat}));
    });
    this.props.mySocket.on("partner hand", (cards) => {
      cards = sortHand(cards, this.props.contract.suit);
      this.props.dispatch(setHand({seat: this.props.contract.declarer, cards: cards}));
    });

    // game over
    this.props.mySocket.on("game over", () => {
      if (this.props.game_state !== GAMESTATES.RESULTS) {
        this.props.dispatch(finishPlaying({
          contract: {...this.props.contract},
          tricks_won: {...this.props.tricks_won},
        }));
      }
      this.props.dispatch(startOnlineGameOverTimer());
    });

    // in case someone else leaves and I get a robot hand to play
    this.props.mySocket.on("robot cards", (robot_data) => {
      this.props.dispatch(setOnlineRobots(robot_data));
    });
  }

  componentWillUnmount() {
    this.cleanup();
    window.removeEventListener("beforeunload", this.cleanup);
  }

  render() {
    if (!this.state.ready) return (
      <LoadingScreen
        text={
          `Waiting for 4 players... ` +
          `There are ${this.state.num_users} players in ${this.state.room}.`
        }
        return={"/tables"}
      />
    );
    return (
      <GameScreen/>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    bid_history: state.bid_history,
    contract: state.contract,
    dummy: state.dummy,
    game_state: state.game_state,
    mySocket: state.mySocket,
    tricks_won: state.tricks_won,
  }
}
export default connect(mapStateToProps)(GameScreenOnline);
