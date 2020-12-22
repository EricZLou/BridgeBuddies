export const LOG_IN = 'LOG_IN';
export const HOME_SCREEN_READY = 'HOME_SCREEN_READY';

export const logIn = (userID) => ({
  type: LOG_IN,
  userID,
});

export const homeScreenReady = () => ({
  type: HOME_SCREEN_READY,
})
