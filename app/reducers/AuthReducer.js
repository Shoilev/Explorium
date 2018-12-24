import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER,
  SIGN_UP_USER,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  errorMessage: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, errorMessage: null };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, errorMessage: action.payload, password: '', loading: false };
    case LOGOUT_USER:
      return { ...state, loading: true, errorMessage: null };
    case LOGOUT_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case LOGOUT_USER_FAIL:
      return { ...state, errorMessage: action.payload, loading: false };
    case SIGN_UP_USER:
      return { ...state, loading: true, errorMessage: null };
    case SIGN_UP_USER_FAIL:
      return { ...state, errorMessage: action.payload, loading: false };
    default:
      return state;
  }
};
