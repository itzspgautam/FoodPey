import axios from 'axios';
import {ApiConfig} from '../Constants';
import {StorageServices} from '../Services';
import {GeneralActions} from './';

const AuthRequest = axios.create({
  baseURL: ApiConfig.BASE_URL,
});

const types = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
};

const Login = cred => async dispatch => {
  if (!cred.email | !cred.password) {
    dispatch({type: types.LOGIN_FAIL, payload: 'All fields are required'});
    return;
  }

  try {
    let requestBody = {
      email: cred.email,
      password: cred.password,
    };
    let loginResponse = await AuthRequest.post(ApiConfig.LOGIN, requestBody);

    await StorageServices.setToken(loginResponse.data.token);

    saveUSerToStore(loginResponse.data.user);

    dispatch(GeneralActions.setTokenToStore(loginResponse.data.token));
    return;
  } catch (error) {
    console.log(error);
    dispatch({type: types.LOGIN_FAIL, payload: 'Oops! Something went wrong.'});
  }
};

const saveUSerToStore = user => async dispatch => {
  dispatch({type: types.LOGIN_SUCCESS, payload: user});
};
export default {Login, saveUSerToStore, types};
