import {combineReducers} from 'redux'

import {firebasePaths} from './FirebasePathReducers'
import {
  bid_history, card_history, cards_on_board, contract, curr_player,
  first_card_played, game_state, hands, ready_to_play, tricks_won,
} from './GamePropReducers'
import {userID, homeScreenReady} from './LogInReducers'
import {mySocket, numUsersLoggedIn} from './SocketReducers'
import {userDetails} from './UserInfoReducers'
import {coins, exp, level_idx} from './UserStatsReducers'
import {storeActive, storeOwned} from './UserStoreReducers'

import {LOG_OUT} from '../actions/Core'

const appReducers = combineReducers({
  firebasePaths,
  bid_history, card_history, cards_on_board, contract, curr_player,
  first_card_played, game_state, hands, ready_to_play, tricks_won,
  userID, homeScreenReady,
  mySocket, numUsersLoggedIn,
  userDetails,
  coins, exp, level_idx,
  storeActive, storeOwned,
})
export default (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return appReducers(state, action);
}
