import {combineReducers} from 'redux';

import {firebasePaths} from './FirebasePathReducers'
import {userID, homeScreenReady} from './LogInReducers'
import {userDetails} from './UserInfoReducers'
import {coins, exp, level_idx} from './UserStatsReducers'
import {storeActive, storeOwned} from './UserStoreReducers'

export default combineReducers({
  firebasePaths,
  userID, homeScreenReady,
  userDetails,
  coins, exp, level_idx,
  storeActive, storeOwned,
})
