import {
  SET_DAILY_CHALLENGE_STATUSES
} from '../actions/Core'

export function daily_challenge_statuses(state={}, action) {
  if (action.type === SET_DAILY_CHALLENGE_STATUSES) {
    return action.map;
  }
  return state;
}
