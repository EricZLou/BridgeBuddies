import {combineReducers} from 'redux';

import {firebasePaths} from './FirebasePathReducers'
import {userID, homeScreenReady} from './LogInReducers'
import {userDetails} from './UserInfoReducers'
import {coins, exp, level_idx} from './UserStatsReducers'
import {storeActive, storeOwned} from './UserStoreReducers'

import {LOG_OUT} from '../actions/Core'

const appReducers = combineReducers({
  firebasePaths,
  userID, homeScreenReady,
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
