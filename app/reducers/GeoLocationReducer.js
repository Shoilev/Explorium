import {
  GEO_LOCATION_FETCH_SUCCESS,
  GEO_LOCATION_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  userLocation: {}
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case GEO_LOCATION_FETCH_SUCCESS:
      return { ...state, userLocation: action.payload};
    case GEO_LOCATION_USER_FAIL:
      return { ...state, userLocation: action.payload };
    default:
      return state;
  }
}
