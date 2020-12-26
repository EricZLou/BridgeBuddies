import {
  SET_SOCKET, SET_NUM_USERS_LOGGED_IN,
} from '../actions/Core'

export function mySocket(state="", action) {
  if (action.type === SET_SOCKET) {
    return action.socket;
  }
  return state;
}

export function numUsersLoggedIn(state="", action) {
  if (action.type === SET_NUM_USERS_LOGGED_IN) {
    return action.num_users_logged_in;
  }
  return state;
}
