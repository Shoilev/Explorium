import {
    LEADERBOARD_FETCH_SUCCESS,
    LEADERBOARD_FETCH_FAIL
  } from '../actions/types';
  
  const INITIAL_STATE = {
    leaderboardData: [],
    error: false,
    errorMessage: "Leaderboard is not active yet"
  };
  
  export default (state= INITIAL_STATE, action) => {
    switch (action.type) {
      case LEADERBOARD_FETCH_SUCCESS:
        return { ...state, leaderboardData: action.payload, error: false };
      case LEADERBOARD_FETCH_FAIL:
        return { ...state, leaderboardData: action.payload, error: true };
      default:
        return state;
    }
  }