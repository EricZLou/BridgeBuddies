import {combineReducers} from 'redux';

import {firebasePaths} from './FirebasePathReducers'
import {contract, curr_player, game_engine, game_state, ready_to_play} from './GamePropReducers'
import {userID, homeScreenReady} from './LogInReducers'
import {mySocket, numUsersLoggedIn} from './SocketReducers'
import {userDetails} from './UserInfoReducers'
import {coins, exp, level_idx} from './UserStatsReducers'
import {storeActive, storeOwned} from './UserStoreReducers'

import {LOG_OUT} from '../actions/Core'

const appReducers = combineReducers({
  firebasePaths,
  contract, curr_player, game_engine, game_state, ready_to_play,
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
