export const SET_STORE_ACTIVE = 'SET_STORE_ACTIVE';
export const SET_STORE_OWNED = 'SET_STORE_OWNED';

export const setStoreActive = (dict) => ({
  type: SET_STORE_ACTIVE,
  dict,
});

export const setStoreOwned = (dict) => ({
  type: SET_STORE_OWNED,
  dict,
});
