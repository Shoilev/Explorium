import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import CountriesReducer from './CountriesReducer';
import CitiesReducer from './CitiesReducer';
import LandmarksReducer from './LandmarksReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  countries: CountriesReducer,
  cities: CitiesReducer,
  landmarks: LandmarksReducer
});