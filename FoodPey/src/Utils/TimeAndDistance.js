import {AppConfig} from '../Constants';

const calculateDistance = distance => {
  if (distance > 1000) return (distance / 1000).toFixed(2) + 'km';
  else return distance.toFixed(1) + 'm';
  //return distance;
};

const calculateTime = distance => {
  let calculatedTimeInMin =
    (distance / 1000) * AppConfig.DELIVERY_SPEED_PER_KM_IN_MIN +
    AppConfig.SERVICE_TIME_IN_MIN;

  if (calculatedTimeInMin > 60)
    return (calculatedTimeInMin / 60).toFixed(0) + 'h';
  else return calculatedTimeInMin.toFixed(0) + 'min';
};

export default {calculateDistance, calculateTime};
