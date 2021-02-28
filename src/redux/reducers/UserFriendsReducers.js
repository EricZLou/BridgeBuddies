import {
  SET_USER_FRIENDS,
} from '../actions/Core'

export function userFriends(state=[], action) {
  switch (action.type) {
    case SET_USER_FRIENDS:
      return action.list;
    default:
      return state;
  }
}
