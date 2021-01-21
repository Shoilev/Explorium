import {
    GET_ADS_FETCH,
    GET_ADS_FETCH_FAIL
  } from '../actions/types';
  
  const INITIAL_STATE = {
    interstitial: '',
    errorMessage: null
  };
  
  export default (state= INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_ADS_FETCH:
        return { ...state, interstitial: action.payload.interstitial }
      case GET_ADS_FETCH_FAIL:
        return { ...state, errorMessage: action.payload }
      default:
        return state;
    }
  }
