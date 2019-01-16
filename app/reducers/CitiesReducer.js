import {
  CITIES_PER_COUNTRY_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  citiesData: [],
  activeCities: []
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case CITIES_PER_COUNTRY_FETCH_SUCCESS:
      return { ...state, citiesData: action.payload, activeCities: action.payload };
    default:
      return state;
  }
}