import {
  GEO_LOCATION_FETCH_SUCCESS,
  GEO_LOCATION_USER_FAIL,
  GEO_LOCATION_COUNTRY_CITY_SUCCESS,
  GEO_LOCATION_COUNTRY_CITY_FAIL,
  GEO_LOCATION_VIDEO_URI
} from '../actions/types';

const INITIAL_STATE = {
  userLocation: {},
  userCountryAndCity: {},
  userLocatioVideoUri: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GEO_LOCATION_FETCH_SUCCESS:
      return { ...state, userLocation: action.payload};
    case GEO_LOCATION_USER_FAIL:
      return { ...state, userLocation: action.payload };
    case GEO_LOCATION_COUNTRY_CITY_SUCCESS:
      return { ...state, userCountryAndCity: action.payload};
    case GEO_LOCATION_COUNTRY_CITY_FAIL:
      return { ...state, userLocation: action.payload };
    case GEO_LOCATION_VIDEO_URI:
      return { ...state, userLocatioVideoUri: action.payload };
    default:
      return state;
  }
}
