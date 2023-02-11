const {default: Geolocation} = require('@react-native-community/geolocation');

const getCurrentPosition = async () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
  };

  return await Geolocation.getCurrentPosition(
    async success => {
      const currentPosition = {
        _id: null,
        title: 'Current Location',
        coordinates: [success.coords.latitude, success.coords.latitude],
      };
      return currentPosition;
    },
    error => {
      return error;
    },
    options,
  );
};
export default {getCurrentPosition};
