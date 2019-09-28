import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import CountriesReducer from './CountriesReducer';
import CitiesReducer from './CitiesReducer';
import LandmarksReducer from './LandmarksReducer';
import FriendsReducer from './FriendsReducer';
import GeoLocationReducer from './GeoLocationReducer';
import AchievementsReducer from './AchievementsReducer';
import MessagesAlertReducer from './MessagesAlertReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  countries: CountriesReducer,
  cities: CitiesReducer,
  landmarks: LandmarksReducer,
  friends: FriendsReducer,
  userGeoLocation: GeoLocationReducer,
  achievements: AchievementsReducer,
  messagesAlert: MessagesAlertReducer
});
