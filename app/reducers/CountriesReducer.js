import {
  COUNTRIES_FETCH_SUCCESS,
  COUNTRIES_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  countriesData: [],
  activeCountries: []
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTRIES_FETCH_SUCCESS:
      return { ...state, countriesData: action.payload, activeCountries: action.payload };
    case COUNTRIES_UPDATE:
      return { ...state, activeCountries: action.payload };
    default:
      return state;
  }
}