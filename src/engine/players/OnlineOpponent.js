import {connect} from 'react-redux'

import {Player} from './Player'


// REPRESENTS AN ONLINE OPPONENT
class OnlineOpponent extends Player {
  constructor(props) {
    super(props);
    this.show_bidding_box = false;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.hands[ownProps.seat],
    curr_player: state.curr_player,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(OnlineOpponent);
