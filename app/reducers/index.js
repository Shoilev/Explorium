import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import CountriesReducer from './CountriesReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  countries: CountriesReducer
});