import {combineReducers} from 'redux'

import {firebasePaths} from './FirebasePathReducers'
import {
  bid_history, card_history, cards_on_board, contract, curr_player,
  curr_player_with_finish_bidding, dummy, first_card_played,
  game_state, hands, ready_to_play, tricks_won,
} from './GamePropReducers'
import {userID, homeScreenReady} from './LogInReducers'
import {mySocket, numUsersLoggedIn} from './SocketReducers'
import {userDetails} from './UserInfoReducers'
import {coins, exp, level_idx} from './UserStatsReducers'
import {storeActive, storeOwned} from './UserStoreReducers'

import {
  FINISH_BIDDING, LOG_OUT
} from '../actions/Core'


const combinedReducer = combineReducers({
  firebasePaths,
  bid_history, card_history, cards_on_board, contract, curr_player,
  curr_player_with_finish_bidding, dummy, first_card_played,
  game_state, hands, ready_to_play, tricks_won,
  userID, homeScreenReady,
  mySocket, numUsersLoggedIn,
  userDetails,
  coins, exp, level_idx,
  storeActive, storeOwned,
})

function crossSliceReducer(state, action) {
  switch (action.type) {
    case FINISH_BIDDING:
      // pass contract into curr_player() after contract is set
      return {
        ...state,
        curr_player: curr_player_with_finish_bidding(
          state.curr_player, action, state.contract
        ),
      };
    default:
      return state;
  }
}

export default function finalReducer(state, action) {
  const intermediateState = combinedReducer(state, action);
  let finalState = crossSliceReducer(intermediateState, action);
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return finalState;
}
