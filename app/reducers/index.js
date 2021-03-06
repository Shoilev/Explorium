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
import LeaderboardReducer from './LeaderboardReducer';
import GameRulesReducer from './GameRulesReducer';
import AdsReducer from './AdsReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  countries: CountriesReducer,
  cities: CitiesReducer,
  landmarks: LandmarksReducer,
  friends: FriendsReducer,
  userGeoLocation: GeoLocationReducer,
  achievements: AchievementsReducer,
  messagesAlert: MessagesAlertReducer,
  leaderboard: LeaderboardReducer,
  gameRules: GameRulesReducer,
  ads: AdsReducer
});
