import axios from 'axios';
import {ApiConfig, AppConfig} from '../Constants';

const AuthRequest = axios.create({
  baseURL: ApiConfig.BASE_URL,
});

const types = {
  SET_NEARBY_STORES: 'SET_NEARBY_STORES',
  SET_STORE_LOADING: 'SET_STORE_LOADING',
};

const getNearbyStores = location => async dispatch => {
  dispatch({
    type: types.SET_STORE_LOADING,
    payload: true,
  });
  try {
    let requestBody = {
      params: {
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        maxDistanceinKm: 30,
      },
    };
    let stores = await AuthRequest.get(
      ApiConfig.GET_NEARBY_STORE +
        `?latitude=${parseFloat(
          location.coordinates[1],
        )}&longitude=${parseFloat(location.coordinates[0])}&maxDistanceinKm=${
          AppConfig.MAX__NEARBY_DISTANCE
        }`,
    );
    dispatch({
      type: types.SET_NEARBY_STORES,
      payload: stores.data.store,
    });
  } catch (error) {
    console.log(error.response.data);
  }

  dispatch({
    type: types.SET_STORE_LOADING,
    payload: false,
  });
};

export default {getNearbyStores, types};
