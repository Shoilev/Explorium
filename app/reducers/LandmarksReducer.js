import {
  LANDMARKS_FETCH_SUCCESS,
  LANDMARKS_FETCH_FAIL,
  LANDMARKS_SHADOW_FETCH_SUCCESS,
  LANDMARKS_SHADOW_CITIES,
  LANDMARKS_ALL_FETCH_SUCCESS,
  HANDLE_LANDMARKS_MAP_VIEW
} from '../actions/types';

const INITIAL_STATE = {
  landmarksData: [],
  landmarksShadowData: [],
  landmarksAllData: [],
  activeLandmarksAll: [],
  activeLandmarks: [],
  activeLandmarksShadowData: [],
  shadowCities: false,
  error: false,
  mapViewEnabled: false
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case LANDMARKS_FETCH_SUCCESS:
      return { ...state, landmarksData: action.payload, activeLandmarks: action.payload };

    case LANDMARKS_SHADOW_FETCH_SUCCESS:
      return { ...state, landmarksShadowData: action.payload, activeLandmarksShadowData: action.payload }

    case LANDMARKS_ALL_FETCH_SUCCESS:
      return { ...state, landmarksAllData: action.payload, activeLandmarksShadowData: action.payload }

    case LANDMARKS_FETCH_FAIL:
      return { ...state, error: action.payload };

    case LANDMARKS_SHADOW_CITIES:
      return { ...state, shadowCities: action.payload }
    case HANDLE_LANDMARKS_MAP_VIEW:
      return { ...state, mapViewEnabled: action.payload }
    default:
      return state;
  }
}