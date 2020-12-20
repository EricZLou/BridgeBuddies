import {combineReducers} from 'redux';

import {coins} from './CoinReducers'
import {experience} from './ExpReducers'
import {userID} from './LogInReducers'

export default combineReducers({
  coins,
  experience,
  userID,
})
