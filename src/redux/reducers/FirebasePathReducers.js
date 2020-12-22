import {
  SET_FIREBASE_PATHS
} from '../actions/Core'

export function firebasePaths(state={}, action) {
  if (action.type === SET_FIREBASE_PATHS) {
    return {
      details: action.details,
      stats: action.stats,
      store: action.store,
    };
  }
  return state;
}
