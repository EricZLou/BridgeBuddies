export const SET_SOCKET = 'SET_SOCKET';
export const SET_NUM_USERS_LOGGED_IN = 'SET_NUM_USERS_LOGGED_IN';

export const setSocket = (socket) => ({
  type: SET_SOCKET,
  socket,
});
export const setNumUsersLoggedIn = (num_users_logged_in) => ({
  type: SET_NUM_USERS_LOGGED_IN,
  num_users_logged_in,
});
