import {
  LANDMARKS_FETCH_SUCCESS,
  LANDMARKS_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  landmarksData: [],
  activeLandmarks: [],
  error: false
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case LANDMARKS_FETCH_SUCCESS:
      return { ...state, landmarksData: action.payload, activeLandmarks: action.payload };

    case LANDMARKS_FETCH_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}