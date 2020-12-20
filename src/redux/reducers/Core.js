import {combineReducers} from 'redux';

import {coins} from './CoinReducers'
import {experience} from './ExpReducers'

export default combineReducers({
  coins,
  experience,
})
