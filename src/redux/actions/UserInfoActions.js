export const USER_DATABASE = 'USER_DATABASE';
export const USER_FIREBASE_OBJECT = 'USER_FIREBASE_OBJECT';

export const userDatabase = () => ({
  type: USER_DATABASE,
});
export const userFirebaseObject = () => ({
  type: USER_FIREBASE_OBJECT,
});
