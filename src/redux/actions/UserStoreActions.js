export const SET_USER_STORE_ACTIVE = 'SET_STORE_ACTIVE';
export const SET_USER_STORE_OWNED = 'SET_STORE_OWNED';

export const setUserStoreActive = (dict) => ({
  type: SET_USER_STORE_ACTIVE,
  dict,
});

export const setUserStoreOwned = (dict) => ({
  type: SET_USER_STORE_OWNED,
  dict,
});
