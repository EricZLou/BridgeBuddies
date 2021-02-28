export const SET_FIREBASE_PATHS = 'SET_FIREBASE_PATHS';

export const setFirebasePaths = (
  details, stats, store, friends, settings
) => ({
  type: SET_FIREBASE_PATHS,
  details,
  stats,
  store,
  friends,
  settings,
});
