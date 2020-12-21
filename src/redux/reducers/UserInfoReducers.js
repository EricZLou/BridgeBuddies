import Firebase from '../../Firebase';

import {
  USER_FIREBASE_OBJECT, USER_DATABASE
} from '../actions/Core'

export function userDatabase(state=null, action) {
  if (action.type === USER_DATABASE)
    return Firebase.database().ref(`/users/${Firebase.auth().currentUser.uid}`);
  return state;
}

export function userFirebaseObject(state=null, action) {
  if (action.type === USER_FIREBASE_OBJECT)
    return Firebase.auth().currentUser;
  return state;
}
