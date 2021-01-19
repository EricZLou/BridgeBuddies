export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const logIn = (userID) => ({
  type: LOG_IN,
  userID,
});
export const logOut = () => ({
  type: LOG_OUT,
});
