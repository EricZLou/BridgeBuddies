import {
  SET_USER_DETAILS,
} from '../actions/Core'

export function userDetails(state={first_name: null, last_name: null}, action) {
  if (action.type === SET_USER_DETAILS) {
    // make modifications in firebase here with action.userID
    return {
      first_name: action.first_name,
      last_name: action.last_name,
    };
  }
  return state;
}
