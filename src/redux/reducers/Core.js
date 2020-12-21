import {combineReducers} from 'redux';

import {coins} from './CoinReducers'
import {experience} from './ExpReducers'
import {userID} from './LogInReducers'
import {userDatabase, userFirebaseObject} from './UserInfoReducers'

export default combineReducers({
  coins,
  experience,
  userID,
  userDatabase,
  userFirebaseObject,
})
