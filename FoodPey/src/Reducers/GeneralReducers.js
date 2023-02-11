import {GeneralActions} from '../Actions';

const initialState = {
  isAppLoading: true,
  isFirstTimeUse: true,
  token: null,
  locationPermission: false,
};

const GeneralReducers = (state = initialState, action) => {
  switch (action.type) {
    case GeneralActions.types.IS_APP_STARTING:
      return {...state, isAppLoading: action.payload};

    case GeneralActions.types.IS_FIRST_TIME:
      return {...state, isFirstTimeUse: action.payload};

    case GeneralActions.types.SET_TOKEN:
      return {...state, token: action.payload};

    case GeneralActions.types.SET_LOCATION_PERMISSION:
      return {...state, locationPermission: action.payload};

    default:
      return state;
  }
};

export default GeneralReducers;
