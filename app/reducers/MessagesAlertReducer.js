import {
  MESSAGES_FETCH,
  MESSAGES_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  message: '',
  link: null,
  errorMessage: null
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGES_FETCH:
      return { ...state, message: action.payload.message, link: action.payload.link }
    case MESSAGES_FETCH_FAIL:
      return { ...state, errorMessage: action.payload }
    default:
      return state;
  }
}