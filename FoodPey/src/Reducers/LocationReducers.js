import {LocationActions} from '../Actions';

const initialState = {
  initLocation: null,
  addresses: null,
  addressLoading: true,
  selectedAddress: null,
};

const LocationReducers = (state = initialState, action) => {
  switch (action.type) {
    case LocationActions.types.SET_INIT_LOCATION:
      return {
        ...state,
        initLocation: action.payload,
      };

    case LocationActions.types.SET_ALL_ADDRESS:
      return {
        ...state,
        addresses: action.payload,
        addressLoading: false,
      };

    case LocationActions.types.SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };

    default:
      return state;
  }
};

export default LocationReducers;
