import {combineReducers} from 'redux'

import {firebasePaths} from './FirebasePathReducers'
import {
  bid_history, card_history, cards_on_board, contract, curr_player,
  dummy, first_card_played, game_state, hands, online_game_over_timer,
  player_types, ready_to_play, tricks_won,
} from './GamePropReducers'
import {
  updates_with_play_card
} from './GamePropReducers'
import {userID, homeScreenReady} from './LogInReducers'
import {mySocket, numUsersLoggedIn} from './SocketReducers'
import {userDetails} from './UserInfoReducers'
import {coins, exp, level_idx} from './UserStatsReducers'
import {storeActive, storeOwned} from './UserStoreReducers'

import {
  LOG_OUT, PLAY_CARD,
} from '../actions/Core'


const initialReducer = combineReducers({
  firebasePaths,
  bid_history, card_history, cards_on_board, contract, curr_player,
  dummy, first_card_played, game_state, hands, online_game_over_timer,
  player_types, ready_to_play, tricks_won,
  userID, homeScreenReady,
  mySocket, numUsersLoggedIn,
  userDetails,
  coins, exp, level_idx,
  storeActive, storeOwned,
})

function crossSliceReducer(state, action) {
  switch (action.type) {
    case PLAY_CARD:
      // pass cards_on_board into updates() after it is updated
      return {
        ...state,
        ...updates_with_play_card(
          {
            curr_player: state.curr_player,
            tricks_won: state.tricks_won,
            ready_to_play: state.ready_to_play,
          }, action, {
            cards_on_board: state.cards_on_board,
            contract: state.contract,
          }
        ),
      };
    default:
      return state;
  }
}

export default function finalReducer(state, action) {
  const intermediateState = initialReducer(state, action);
  let finalState = crossSliceReducer(intermediateState, action);
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  console.log(action);
  console.log(finalState);
  return finalState;
}
