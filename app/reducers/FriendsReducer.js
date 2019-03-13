import {
  FRIENDS_FETCH_SUCCESS,
  FRIENDS_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  friendsData: [],
  activeFriends: []
};

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case FRIENDS_FETCH_SUCCESS:
      return { ...state, friendsData: action.payload, activeFriends: action.payload };
    case FRIENDS_UPDATE:
      return { ...state, activeFriends: action.payload };
    default:
      return state;
  }
}
