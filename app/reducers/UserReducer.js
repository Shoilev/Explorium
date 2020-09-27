import {
  GET_USER,
  LOCAL_CITY_CHANGED,
  NICKNAME_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  userEmail: '',
  userName: '',
  userPhoto: '',
  userUID: '',
  userHomeLocale: '',
  userNickname: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userEmail: action.payload.email, userUID: action.payload.uid, userPhoto: action.payload.photoURL ? action.payload.photoURL + '?type=large': null, userName:action.payload.displayName };
    case LOCAL_CITY_CHANGED:
      return {...state, userHomeLocale: action.payload}
    case NICKNAME_CHANGED:
      return {...state, userNickname: action.payload}
    default:
      return state;
  }
};
