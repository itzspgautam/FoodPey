import {PermissionsAndroid} from 'react-native';

const chekLocationPermission = async () => {
  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return granted;
};

const requestLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return PermissionsAndroid.RESULTS.GRANTED;
  } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    return PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
  } else {
    return PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
  }
};

export default {chekLocationPermission, requestLocationPermission};
