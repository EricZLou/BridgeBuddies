import {
  SET_USER_FRIENDS, FRIENDS_LOGGED_IN, FRIEND_LOGGED_IN, FRIEND_LOGGED_OUT
} from '../actions/Core'

export function userFriends(state=[], action) {
  switch (action.type) {
    case SET_USER_FRIENDS:
      return action.list;
    default:
      return state;
  }
}

export function userFriendsLoggedIn(state=[], action) {
  switch (action.type) {
    case FRIENDS_LOGGED_IN:
      return action.friendIDs;
    case FRIEND_LOGGED_IN:
      return [...state, action.friendID];
    case FRIEND_LOGGED_OUT:
      let state_copy = [...state];
      const idx = state_copy.indexOf(action.friendID);
      state_copy.splice(idx, 1);
      return state_copy;
    default:
      return state;
  }
}
