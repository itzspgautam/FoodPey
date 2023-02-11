import {combineReducers} from 'redux';
import GeneralReducers from './GeneralReducers';
import LocationReducers from './LocationReducers';
import StoreReducers from './StoreReducers';
import UserReducers from './UserReducers';

export default combineReducers({
  generalState: GeneralReducers,
  userState: UserReducers,
  locationState: LocationReducers,
  storeState: StoreReducers,
});
