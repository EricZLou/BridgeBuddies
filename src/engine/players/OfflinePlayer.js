import {connect} from 'react-redux'

import {Player} from './Player'


// REPRESENTS CURRENT USER PLAYING OFFLINE
class OfflinePlayer extends Player {

};

const mapStateToProps = (state, ownProps) => {
  return {
    bid_history: state.bid_history,
    cards: state.hands[ownProps.seat],
    cards_on_board: state.cards_on_board,
    contract: state.contract,
    curr_player: state.curr_player,
    game_state: state.game_state,
    ready_to_play: state.ready_to_play,
  }
}
export default connect(mapStateToProps)(OfflinePlayer);
