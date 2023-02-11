import {UserActions} from '../Actions';

const initialState = {
  user: null,
  error: null,
  token: null,
};

const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case UserActions.types.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducers;
