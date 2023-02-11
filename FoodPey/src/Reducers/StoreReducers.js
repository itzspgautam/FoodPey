import {StoreActions} from '../Actions';

const initialState = {
  storeLoading: false,
  stores: null,
  selectedStore: null,
};

const StoreReducers = (state = initialState, action) => {
  switch (action.type) {
    case StoreActions.types.SET_NEARBY_STORES:
      return {
        ...state,
        stores: action.payload,
      };

    case StoreActions.types.SET_STORE_LOADING:
      return {
        ...state,
        storeLoading: action.payload,
      };

    default:
      return state;
  }
};

export default StoreReducers;
