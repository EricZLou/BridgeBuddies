import {combineReducers} from 'redux'

import {daily_challenge_statuses} from './DailyChallengeReducers'
import {firebasePaths} from './FirebasePathReducers'
import {
  bid_history, card_history, cards_on_board, contract, curr_player, daily_challenge_date_str,
  dummy, first_card_played, game_info, game_results, game_state, hands, online_game_over_timer,
  player_types, ready_to_play, tricks_won,
} from './GamePropReducers'
import {
  updates_with_play_card
} from './GamePropReducers'
import {userID} from './LogInReducers'
import {variable_sizes} from './ScreenReducers'
import {mySocket, numUsersLoggedIn} from './SocketReducers'
import {userDetails} from './UserDetailsReducers'
import {userFriends, userFriendsLoggedIn} from './UserFriendsReducers'
import {userSettings} from './UserSettingsReducers'
import {coins, exp, games_played, level_idx, total_exp} from './UserStatsReducers'
import {storeActive, storeOwned} from './UserStoreReducers'

import {
  LOG_OUT, PLAY_CARD,
} from '../actions/Core'


const initialReducer = combineReducers({
  daily_challenge_statuses,
  firebasePaths,
  bid_history, card_history, cards_on_board, contract, curr_player, daily_challenge_date_str,
  dummy, first_card_played, game_info, game_results, game_state, hands, online_game_over_timer,
  player_types, ready_to_play, tricks_won,
  userID,
  variable_sizes,
  mySocket, numUsersLoggedIn,
  userDetails,
  userFriends, userFriendsLoggedIn,
  userSettings,
  coins, exp, games_played, level_idx, total_exp,
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
            game_type: state.game_info.game_type,
            player_types: state.player_types,
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
    finalState = {userID: ""};
  }
  console.log(action);
  console.log(finalState);
  return finalState;
}
