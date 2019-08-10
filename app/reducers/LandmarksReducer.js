import {
  LANDMARKS_FETCH_SUCCESS,
  LANDMARKS_FETCH_FAIL,
  LANDMARKS_SHADOW_FETCH_SUCCESS,
  LANDMARKS_SHADOW_CITIES
} from '../actions/types';

const INITIAL_STATE = {
  landmarksData: [],
  landmarksShadowData: [],
  activeLandmarks: [],
  activeLandmarksShadowData: [],
  shadowCities: false,
  error: false
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case LANDMARKS_FETCH_SUCCESS:
      return { ...state, landmarksData: action.payload, activeLandmarks: action.payload };

    case LANDMARKS_SHADOW_FETCH_SUCCESS:
      return { ...state, landmarksShadowData: action.payload, activeLandmarksShadowData: action.payload }

    case LANDMARKS_FETCH_FAIL:
      return { ...state, error: action.payload };

    case LANDMARKS_SHADOW_CITIES:
      return { ...state, shadowCities: action.payload }
    default:
      return state;
  }
}