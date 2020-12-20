export const LOG_IN = 'LOG_IN';

export const logIn = (userID) => ({
  type: LOG_IN,
  userID,
});
