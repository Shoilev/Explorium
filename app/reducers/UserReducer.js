import {
  GET_USER
} from '../actions/types';

const INITIAL_STATE = {
  userEmail: '',
  userUID: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userEmail: action.payload.email, userUID: action.payload.uid };
    default:
      return state;
  }
};
