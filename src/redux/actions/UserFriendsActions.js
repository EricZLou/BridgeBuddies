export const SET_USER_FRIENDS = 'SET_USER_FRIENDS';
export const FRIENDS_LOGGED_IN = 'FRIENDS_LOGGED_IN';
export const FRIEND_LOGGED_IN = 'FRIEND_LOGGED_IN';
export const FRIEND_LOGGED_OUT = 'FRIEND_LOGGED_OUT';

export const setUserFriends = (list) => ({
  type: SET_USER_FRIENDS,
  list,
});
export const friendsLoggedIn = (friendIDs) => ({
  type: FRIENDS_LOGGED_IN,
  friendIDs,
})
export const friendLoggedIn = (friendID) => ({
  type: FRIEND_LOGGED_IN,
  friendID,
});
export const friendLoggedOut = (friendID) => ({
  type: FRIEND_LOGGED_OUT,
  friendID,
});
