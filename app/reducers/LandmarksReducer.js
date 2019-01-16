import {
  LANDMARKS_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  landmarksData: [],
  activeLandmarks: []
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case LANDMARKS_FETCH_SUCCESS:
      return { ...state, landmarksData: action.payload, activeLandmarks: action.payload };
    default:
      return state;
  }
}