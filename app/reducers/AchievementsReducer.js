import {
  ACHIEVEMENTS_FETCH_SUCCESS,
  ACHIEVEMENTS_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  achievementsData: [],
  error: false,
  errorMessage: ''
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case ACHIEVEMENTS_FETCH_SUCCESS:
      return { ...state, achievementsData: action.payload, error: false };
    case ACHIEVEMENTS_FETCH_FAIL:
      return { ...state, activeCountries: action.payload, error: true, errorMessage: "You don't have achievements yet" };
    default:
      return state;
  }
}