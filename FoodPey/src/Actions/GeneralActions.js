import axios from 'axios';
import {PermissionsAndroid} from 'react-native';
import {ApiConfig} from '../Constants';
import {PermissionServices, StorageServices} from '../Services';
import {LocationActions, StoreActions, UserActions} from './';

const AuthRequest = axios.create({
  baseURL: ApiConfig.BASE_URL,
});

const types = {
  IS_APP_STARTING: 'IS_APP_STARTING',
  IS_FIRST_TIME: 'IS_FIRST_TIME',
  SET_TOKEN: 'SET_TOKEN',
  SET_LOCATION_PERMISSION: 'SET_LOCATION_PERMISSION',
};

const AppStart = () => async dispatch => {
  dispatch({type: types.IS_APP_STARTING, payload: true});

  //Check if app is first time opened
  await StorageServices.getFirstTimeUse().then(res => {
    if (res) dispatch({type: types.IS_FIRST_TIME, payload: false});
  });

  //Check if user is logged in(is token stored in local storage). If Token found, verify it
  await StorageServices.getToken().then(async token => {
    if (token) {
      await verifyToken(token).then(async res => {
        if (res.status === true) {
          dispatch(setTokenToStore(token));
          dispatch(UserActions.saveUSerToStore(res.user));
        } else {
          console.log('Error:', res);
          alert(res.message);
          dispatch(setTokenToStore(null));
          await StorageServices.setToken('');
        }
      });
    }
  });

  //Check if location permission allowed
  await PermissionServices.chekLocationPermission().then(async res => {
    await StorageServices.getAddress().then(async location => {
      if (location) {
        const storageLocation = JSON.parse(location);
        await dispatch(LocationActions.setAddress(storageLocation));
        await dispatch(StoreActions.getNearbyStores(storageLocation));
      }
    });
    dispatch({type: types.SET_LOCATION_PERMISSION, payload: res});
  });

  dispatch({type: types.IS_APP_STARTING, payload: false});
};

const setFirstTimeUse = () => async dispatch => {
  StorageServices.setFirstTimeUse().then(res => {
    dispatch({type: types.IS_FIRST_TIME, payload: false});
  });
};

const verifyToken = async token => {
  if (!token) return {status: false, message: 'Please provide token.'};
  try {
    let tokenResponse = await AuthRequest.post(
      ApiConfig.TOKEN_VERIFY,
      {},
      {headers: {Authorization: `Bearer ${token}`}},
    );

    return {status: true, user: tokenResponse.data.user};
  } catch (error) {
    return {status: false, message: 'Connection to server failed.'};
  }
};

const setTokenToStore = token => async dispatch => {
  dispatch({type: types.SET_TOKEN, payload: token});
};

const setLocationPermission = isAllowed => async dispatch => {
  dispatch({type: types.SET_LOCATION_PERMISSION, payload: isAllowed});
};

export default {
  AppStart,
  setFirstTimeUse,
  setTokenToStore,
  setLocationPermission,
  types,
};
