import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {ApiConfig} from '../Constants';
import {StorageServices} from '../Services';
import StoreActions from './StoreActions';

const AuthRequest = axios.create({
  baseURL: ApiConfig.BASE_URL,
});

const types = {
  SET_INIT_LOCATION: 'SET_INIT_LOCATION',
  SET_ALL_ADDRESS: 'SET_ALL_ADDRESS',
  SET_SELECTED_ADDRESS: 'SET_SELECTED_ADDRESS',
};

const setAddress = address => async dispatch => {
  console.log('Delivered to: ', address);
  dispatch(StoreActions.getNearbyStores(address));
  StorageServices.setAddress(JSON.stringify(address)).then(res => {
    dispatch({type: types.SET_SELECTED_ADDRESS, payload: address});
  });
};

// const setSelectedAddres = address => async dispatch => {
//   await StorageServices.setInitLocation(JSON.stringify(address));
//   await dispatch(setInitialAddress(address));

//   dispatch({
//     type: types.SET_SELECTED_ADDRESS,
//     payload: address,
//   });
// };

const getAllAddress = () => async dispatch => {
  try {
    let token = await StorageServices.getToken();
    const getAddress = await AuthRequest.get(ApiConfig.GET_ADDRESSES, {
      headers: {Authorization: `Bearer ${token}`},
    });
    dispatch({type: types.SET_ALL_ADDRESS, payload: getAddress.data.addresses});
  } catch (error) {
    console.log(error.response.data);
  }
};

const createAddress = (newAddress, navigation) => async dispatch => {
  try {
    let token = await StorageServices.getToken();
    const createAddress = await AuthRequest.post(
      ApiConfig.CREATE_ADDRESSES,
      newAddress,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    if (createAddress) {
      navigation.navigate('AddressInput');
      dispatch(setAddress(createAddress.data.address));
    }
    dispatch(getAllAddress());
  } catch (error) {
    console.log(error.response.data);
  }
};

export default {getAllAddress, setAddress, createAddress, types};
