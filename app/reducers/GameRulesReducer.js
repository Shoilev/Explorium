import {
    GAME_RULES_FETCH,
    GAME_RULES_FETCH_FAIL
  } from '../actions/types';
  
  const INITIAL_STATE = {
    rules: '',
    winners: '',
    errorMessage: null
  };
  
  export default (state= INITIAL_STATE, action) => {
    switch (action.type) {
      case GAME_RULES_FETCH:
        return { ...state, rules: action.payload.rules, winners: action.payload.winners }
      case GAME_RULES_FETCH_FAIL:
        return { ...state, errorMessage: action.payload }
      default:
        return state;
    }
  }